import { Injectable } from '@angular/core'
import { Firebase } from '@ionic-native/firebase/ngx'
import { Platform } from '@ionic/angular'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage'


@Injectable({
   providedIn: 'root'
})
export class FbsService {

   constructor(
      private afStorage: AngularFireStorage,
      private platform: Platform) {
      console.log('FbsService constructor')
   }

   getFiles(){

   }
   uploadToStorage(information): AngularFireUploadTask{
      let newName = `${new Date().getTime()}.txt`
      return this.afStorage.ref(`patients/${newName}`).putString(information)
   }
   storeInfoToDatabase(metaInfo){
      let toSave = {
         created:metaInfo.timeCreated,
         url:metaInfo.downloadURLs[0],
         fullPath:metaInfo.fullPath,
         contentType:metaInfo.contentType
      }
      return toSave
   }
   deleteFile(file){
      let key = file.key
      let storagePath = file.fullPath
      this.afStorage.ref(storagePath).delete()
   }
}