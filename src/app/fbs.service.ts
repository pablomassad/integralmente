import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage'
import * as firebase from "firebase"

@Injectable({
   providedIn: 'root'
})
export class FbsService {

   private uploadTask: firebase.storage.UploadTask

   constructor(
      private afStorage: AngularFireStorage) {
      console.log('FbsService constructor')
   }

   pushUpload(dni, upload:Upload){
      const newName = upload.file.name //`${new Date().getTime()}`
      const stPath = dni+'/'+newName
      let storageRef = firebase.storage().ref()
      this.uploadTask = storageRef.child(stPath).put(upload.file)

      this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot)=>{
         upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      }, error =>{
         console.log('upload avatar error: ', error)
      })
      return this.uploadTask
   }
   deleteFileStorage(dni, name:string){
      const storageRef = firebase.storage().ref()
      const stPath = dni+'/'+name
      storageRef.child(stPath).delete()
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

export class Upload{
   $key:string
   file:File
   name:string
   url:string
   progress:number
   createdAt: Date = new Date()

   constructor(file:File){
      this.file = file
   }
}