import { Component, OnInit } from '@angular/core'
import { FbsService, Upload } from 'src/app/fbs.service'
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { AngularFirestore } from '@angular/fire/firestore'
import { GlobalService } from 'fwk4-services'
import * as moment from 'moment'
import { Chooser } from '@ionic-native/chooser/ngx'


@Component({
   selector: 'app-ficha',
   templateUrl: './ficha.page.html',
   styleUrls: ['./ficha.page.scss'],
})
export class FichaPage implements OnInit {
   validations_form: FormGroup

   validation_messages = {
      'nombres': [
         { type: 'required', message: 'Los nombres son requeridos' }
      ],
      'apellido': [
         { type: 'required', message: 'El apellido es requerido' }
      ]
   }

   patient: any
   isMobile: boolean = false
   fechaNacimiento: any

   constructor(
      private formBuilder: FormBuilder,
      private globalSrv: GlobalService,
      private chooser: Chooser,
      private afs: AngularFirestore,
      private fbsSrv: FbsService
   ) {
      console.log('FichaPage constructor')
   }

   ngOnInit() {
      this.validations_form = this.formBuilder.group({
         nombres: new FormControl('',
            Validators.compose([
               Validators.required
            ])),
         apellido: new FormControl('',
            Validators.compose([
               Validators.required
            ]))
      })

      this.patient = this.globalSrv.getItemRAM('patient')
      this.fechaNacimiento = moment(this.patient.nacimiento).format("MM/DD/YYYY")
      this.isMobile = this.globalSrv.getItemRAM('isMobile')
   }
   async handleAvatar(files: FileList) {
      this.fbsSrv.startSpinner()
      await this.fbsSrv.deleteFileStorage(this.patient.dni, this.patient.fotoNombre)
      await this.fbsSrv.uploadFile(files.item(0), this.patient.dni).then(obj => {
         this.saveToDB(obj)
      })
      this.fbsSrv.stopSpinner()
   }
   chooseFile() {
      this.chooser.getFile('*/*').then(f => {
         this.fbsSrv.startSpinner()
         this.fbsSrv.uploadFile(f, this.patient.dni).then(obj => {
            this.saveToDB(obj)
         })
      })
   }
   evalEdad() {
      const today = moment()
      const cumple = moment(this.fechaNacimiento)
      const edad = today.diff(cumple, 'y')
      return edad + " años"
   }
   async save() {
      this.fbsSrv.startSpinner()
      this.patient.nacimiento = moment(this.fechaNacimiento).valueOf()
      await this.saveToDB()
   }

   private async saveToDB(obj?: any) {
      if (obj) {
         this.patient.foto = obj.url
         this.patient.fotoNombre = obj.nombre
      }

      if (this.patient.id)
         await this.afs.collection('pacientes').doc(this.patient.id).set(this.patient, { merge: true })
      else
         await this.afs.collection('pacientes').add(this.patient)

      this.fbsSrv.stopSpinner()
   }
}
