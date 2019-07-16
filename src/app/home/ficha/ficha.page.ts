import { Component, OnInit } from '@angular/core'
import { FbsService, Upload } from 'src/app/fbs.service'
import { AngularFirestore } from '@angular/fire/firestore'
import { GlobalService } from 'fwk4-services'
import * as moment from 'moment'
import * as firebase from "firebase"
import { File } from '@ionic-native/file/ngx'
import { Chooser } from '@ionic-native/chooser/ngx'


@Component({
   selector: 'app-ficha',
   templateUrl: './ficha.page.html',
   styleUrls: ['./ficha.page.scss'],
})
export class FichaPage implements OnInit {

   patient: any
   isMobile: boolean = false
   fechaNacimiento: any

   constructor(
      private globalSrv: GlobalService,
      private chooser: Chooser,
      private file:File,
      private afs: AngularFirestore,
      private fbsSrv: FbsService
   ) {
      console.log('FichaPage constructor')
   }

   ngOnInit() {
      this.patient = this.globalSrv.getItemRAM('patient')
      this.fechaNacimiento = moment(this.patient.nacimiento).format("DD/MM/YYYY")
      this.isMobile = this.globalSrv.getItemRAM('isMobile')
   }
   async handleAvatar(files: FileList) {
      await this.fbsSrv.deleteFileStorage(this.patient.dni, this.patient.fotoNombre)
      await this.fbsSrv.uploadFile(files.item(0), this.patient.dni).then(obj=>{
         this.saveToDB(obj)
      })
   }
   chooseFile(){
      this.chooser.getFile('ok').then(f => {
         this.fbsSrv.uploadFile(f, this.patient.dni).then(obj => {
            this.saveToDB(obj)
         })
      })

      // this.fileChooser.open().then(uri=>{
      //    this.file.resolveLocalFilesystemUrl(uri).then(ff=>{
      //       let dirPath = ff.nativeURL
      //       let dirPathSegments = dirPath.split('/')
      //       dirPathSegments.pop()
      //       dirPath = dirPathSegments.join('/')

      //       this.file.readAsArrayBuffer(dirPath,ff.name).then(buffer=>{
      //          this.fbsSrv.uploadFileBuffer(buffer, this.patient.dni).then(obj=>{
      //             this.patient.foto = obj.url
      //             this.patient.fotoNombre = obj.nombre
      //             this.saveToDB()
      //          })
      //       })
      //    })
      // })
   }
   evalEdad() {
      const today = moment()
      const cumple = moment(this.fechaNacimiento)
      const edad = today.diff(cumple, 'y')
      return edad + " años"
   }
   async save() {
      this.patient.nacimiento = moment(this.fechaNacimiento).valueOf()
      this.saveToDB()
   }

   private async saveToDB(obj?:any){
      if (obj){
         this.patient.foto = obj.url
         this.patient.fotoNombre = obj.nombre   
      }

      if (this.patient.id)
         await this.afs.collection('pacientes').doc(this.patient.id).set(this.patient, { merge: true })
      else
         await this.afs.collection('pacientes').add(this.patient)
   }
}
