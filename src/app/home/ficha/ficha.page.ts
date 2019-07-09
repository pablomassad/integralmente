import { Component, OnInit } from '@angular/core'
import { FbsService } from 'src/app/fbs.service'
import { AngularFirestore } from '@angular/fire/firestore'
import { ImagePicker } from '@ionic-native/image-picker/ngx'
import { Platform } from '@ionic/angular'

import { FileUploader, FileLikeObject } from 'ng2-file-upload'
import { concat } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { GlobalService } from 'fwk4-services'
import * as moment from 'moment'

@Component({
   selector: 'app-ficha',
   templateUrl: './ficha.page.html',
   styleUrls: ['./ficha.page.scss'],
})
export class FichaPage implements OnInit {

   public fileUploader: FileUploader = new FileUploader({});
   public hasBaseDropZoneOver: boolean = false;

   patient: any
   isMobile:boolean = false

   constructor(
      private globalSrv:GlobalService,
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
      this.isMobile = this.platform.is('cordova')
   }
   changePhoto() {
      const data = {}

      if (this.isMobile) {
         this.pickImageFromMobile()
      }
      else {
         this.pickImageFromBrowser()
      }


      // this.fbsSrv.uploadToStorage(data).then().then(x => {
      //    console.log('metadata: ', x)
      //    this.fbsSrv.storeInfoToDatabase(x.metadata)
      // })
   }
   evalEdad(nac){
      const today = moment()
      const cumple = moment(nac)
      const edad = today.diff(cumple, 'y')
      return edad + " años"
   }
   save() {
      if (this.patient.id)
         this.afs.collection('pacientes').doc(this.patient.id).set(this.patient, { merge: true })
      else
         this.afs.collection('pacientes').add(this.patient)      
   }
   viewFile(url) {
      //this.iab.open(url)
   }
   fileOverBase(event): void {
      this.hasBaseDropZoneOver = event;
   }
   getFiles(): FileLikeObject[] {
      return this.fileUploader.queue.map((fileItem) => {
         return fileItem.file
      })
   }
   uploadFiles() {
      let files = this.getFiles();
      let requests = [];

      files.forEach((file) => {
         let formData = new FormData()
         formData.append('file', file.rawFile, file.name)
         requests.push(this.uploadFormData(formData))
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

   DJANGO_API_SERVER: string = "http://localhost:8000"
   public uploadFormData(formData) {
      return this.http.post<any>(`${this.DJANGO_API_SERVER}/upload/`, formData);
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
}
