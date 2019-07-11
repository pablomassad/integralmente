import { Component, OnInit } from '@angular/core'
import { FbsService, Upload } from 'src/app/fbs.service'
import { AngularFirestore } from '@angular/fire/firestore'
import { ImagePicker } from '@ionic-native/image-picker/ngx'
import { Platform } from '@ionic/angular'

import { FileUploader, FileLikeObject } from 'ng2-file-upload'
import { concat } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { GlobalService } from 'fwk4-services'
import * as moment from 'moment'
import * as firebase from "firebase"


@Component({
   selector: 'app-ficha',
   templateUrl: './ficha.page.html',
   styleUrls: ['./ficha.page.scss'],
})
export class FichaPage implements OnInit {

   public fileUploader: FileUploader = new FileUploader({});
   public hasBaseDropZoneOver: boolean = false;

   patient: any
   isMobile: boolean = false
   fechaNacimiento: any

   constructor(
      private globalSrv: GlobalService,
      private http: HttpClient,
      private platform: Platform,
      private imagePicker: ImagePicker,
      private afs: AngularFirestore,
      private fbsSrv: FbsService
   ) {
      console.log('FichaPage constructor')
   }

   async ngOnInit() {
      this.patient = await this.globalSrv.getItem('patient')
      this.fechaNacimiento = moment(this.patient.nacimiento).format("DD/MM/YYYY")
      this.isMobile = this.platform.is('cordova')
   }
   async handleAvatar(files: FileList) {
      await this.fbsSrv.deleteFileStorage(this.patient.dni, this.patient.fotoNombre)
      await this.fbsSrv.uploadFile(files.item(0), this.patient.dni).then(obj=>{
         this.patient.foto = obj.url
         this.patient.fotoNombre = obj.nombre
         this.saveToDB()
      })
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

   private async saveToDB(){
      if (this.patient.id)
         await this.afs.collection('pacientes').doc(this.patient.id).set(this.patient, { merge: true })
      else
         await this.afs.collection('pacientes').add(this.patient)
   }






   private changePhoto() {
      if (this.isMobile) {
         this.pickImageFromMobile()
      }
      else {
         this.pickImageFromBrowser()
      }
   }
   private pickImageFromMobile() {
      const options = {
         // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
         // selection of a single image, the plugin will return it.
         maximumImagesCount: 2,

         // max width and height to allow the images to be.  Will keep aspect
         // ratio no matter what.  So if both are 800, the returned image
         // will be at most 800 pixels wide and 800 pixels tall.  If the width is
         // 800 and height 0 the image will be 800 pixels wide if the source
         // is at least that wide.
         //**** width: int,
         //**** height: int,

         // quality of resized image, defaults to 100
         //**** quality: int (0-100),

         // output type, defaults to FILE_URIs.
         // available options are 
         // window.imagePicker.OutputType.FILE_URI (0) or 
         // window.imagePicker.OutputType.BASE64_STRING (1)
         //**** outputType: int
      }
      this.imagePicker.getPictures(options).then((results) => {
         for (var i = 0; i < results.length; i++) {
            console.log('Image URI: ' + results[i]);
         }
      }, (err) => { });
   }
   private pickImageFromBrowser() {

   }
   private viewFile(url) {
      //this.iab.open(url)
   }
   private fileOverBase(event): void {
      this.hasBaseDropZoneOver = event;
   }
   private getFiles(): FileLikeObject[] {
      return this.fileUploader.queue.map((fileItem) => {
         return fileItem.file
      })
   }
   private uploadFiles() {
      let files = this.getFiles();
      let requests = [];

      files.forEach((file) => {
         let formData = new FormData()
         formData.append('file', file.rawFile, file.name)
         //requests.push(this.uploadFormData(formData))
      })

      concat(...requests).subscribe(
         (res) => {
            console.log(res)
         },
         (err) => {
            console.log(err)
         }
      )
   }
   private uploadImage(imageURI, randomId) {
      return new Promise<any>((resolve, reject) => {
         let storageRef = firebase.storage().ref();
         let imageRef = storageRef.child('image').child(randomId);
         this.encodeImageUri(imageURI, function (image64) {
            imageRef.putString(image64, 'data_url')
               .then(snapshot => {
                  snapshot.ref.getDownloadURL()
                     .then(res => resolve(res))
               }, err => {
                  reject(err);
               })
         })
      })
   }
   private encodeImageUri(a, b) {

   }
}
