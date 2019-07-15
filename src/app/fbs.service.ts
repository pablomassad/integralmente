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

   showAllFiles(dni) {
      // Create a reference under which you want to list
      var listRef = this.afStorage.storage.ref().child(dni.toString());

      // Find all the prefixes and items.
      var pr = listRef.listAll().then(function (res) {
         res.prefixes.forEach((folderRef) => {
            console.log(folderRef)
            // All the prefixes under listRef.
            // You may call listAll() recursively on them.
         })
         res.items.forEach((itemRef) => {
            console.log(itemRef)
         })
      }).catch(function (error) {
         console.log(error)
      })
      return pr
   }
   listFiles(dni) {
      //let storageRef = firebase.storage().ref().child(dni.toString())
      let storageRef = firebase.storage().ref().child(dni.toString())
      const res = storageRef.listAll().then(x => {
         var rta = x
         console.log(rta)
      })
   }

   uploadFile(file: File, id: string): Promise<any> {
      return new Promise(async (resolve, reject) => {
         try {
            const attachment = new Upload(file)
            const sn = await this.pushUpload(id, attachment)
            const url = await sn.ref.getDownloadURL()
            const res = new Object()
            res['url'] = url
            res['nombre'] = sn.ref.name,
            res['extension'] = sn.ref.name.substr(sn.ref.name.indexOf('.')+1)
            resolve(res)
         } catch (error) {
            console.log(error)
            reject(error)
         }
      })
   }
   pushUpload(dni, upload: Upload) {
      const newName = upload.file.name //`${new Date().getTime()}`
      const stPath = dni + '/' + newName
      let storageRef = firebase.storage().ref()
      this.uploadTask = storageRef.child(stPath).put(upload.file)

      this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
         upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      }, error => {
         console.log('upload avatar error: ', error)
      })
      return this.uploadTask
   }
   uploadPic(dni, upload) {
      const newName = upload.file.name //`${new Date().getTime()}`
      const stPath = dni + '/' + newName
      const uploadTask = this.afStorage.upload(stPath, upload.file)
      return uploadTask
   }
   deleteFileStorage(id, name: string) {
      const storageRef = firebase.storage().ref()
      const stPath = id + '/' + name
      storageRef.child(stPath).delete()
   }
   deleteFile(file) {
      let key = file.key
      let storagePath = file.fullPath
      this.afStorage.ref(storagePath).delete()
   }
}

export class Upload {
   $key: string
   file: File
   name: string
   url: string
   progress: number
   createdAt: Date = new Date()

   constructor(file: File) {
      this.file = file
   }
}