import { Component, OnInit } from '@angular/core'
import { FbsService, Upload } from 'fwk4-authentication'
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { AngularFirestore } from '@angular/fire/firestore'
import { GlobalService, ApplicationService } from 'fwk4-services'
import * as moment from 'moment'
import { Chooser } from '@ionic-native/chooser/ngx'
import { UserModel } from 'fwk4-authentication';


@Component({
   selector: 'app-ficha',
   templateUrl: './ficha.page.html',
   styleUrls: ['./ficha.page.scss'],
})
export class FichaPage implements OnInit {
   user: UserModel
   private fileInfo: any
   foto: any = "assets/images/anonymous.png"

   patient: any
   isMobile: boolean = false
   fechaNacimiento: any

   validations_form: FormGroup

   validation_messages = {
      'nombres': [
         { type: 'required', message: 'Los nombres son requeridos' }
      ],
      'apellido': [
         { type: 'required', message: 'El apellido es requerido' }
      ]
   }

   constructor(
      private formBuilder: FormBuilder,
      private globalSrv: GlobalService,
      private appSrv: ApplicationService,
      private chooser: Chooser,
      private afs: AngularFirestore,
      private fbsSrv: FbsService
   ) {
      console.log('FichaPage constructor')
   }

   async ngOnInit() {
      this.user = await this.globalSrv.getItem('userInfo')
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

      if (this.patient.id) {
         this.foto = this.patient.foto
         this.validations_form.setValue({
            nombres: this.patient.nombres,
            apellido: this.patient.apellido
         })
      }
   }
   async chooseFileBrowser(ev) {
      this.fileInfo = ev.target.files[0]
      this.foto = this.fbsSrv.onFileSelected(this.fileInfo)
   }
   async chooseFileMobile() {
      this.fileInfo =  await this.chooser.getFile('*/*') //this.fbsSrv.convertToFile(await this.chooser.getFile('*/*'))
      this.foto = this.fbsSrv.onFileSelected(this.fileInfo)
   }
   evalEdad() {
      const today = moment()
      const cumple = moment(this.fechaNacimiento)
      const edad = today.diff(cumple, 'y')
      return edad + " años"
   }
   cancel() {

   }
   async save(val) {
      if (this.fileInfo) {
         if (this.patient.fotoNombre)
            await this.fbsSrv.deleteFileStorage(this.patient.id, this.patient.fotoNombre)

         const obj = await this.fbsSrv.uploadFile(this.fileInfo, this.patient.id)
         this.patient.foto = obj.url
         this.patient.fotoNombre = obj.nombre
      }

      this.patient.nombres = val.nombres
      this.patient.apellido = val.apellido
      this.patient.nacimiento = moment(this.fechaNacimiento).valueOf()
      this.patient.uid = this.user.id

      if (this.patient.id)
         await this.afs.collection('pacientes').doc(this.patient.id).set(this.patient, { merge: true })
      else
         await this.afs.collection('pacientes').add(this.patient)
   }
}
