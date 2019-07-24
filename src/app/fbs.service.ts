import { Injectable } from '@angular/core'
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage'
import * as firebase from "firebase"
import { ApplicationService } from 'fwk4-services';

@Injectable({
   providedIn: 'root'
})
export class FbsService {

   private uploadTask: firebase.storage.UploadTask
   private loading: any

   constructor(
      private appSrv: ApplicationService,
      private afStorage: AngularFireStorage) {
      console.log('FbsService constructor')
   }

   shortName(n) {
      const maxLen = 12
      var ext = n.substring(n.lastIndexOf(".") + 1, n.length).toLowerCase();
      var filename = n.replace('.' + ext, '');
      if (filename.length <= maxLen) {
         return n;
      }
      filename = filename.substr(0, maxLen) + (n.length > maxLen ? '...' : '');
      return filename + '.' + ext;
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
   uploadFileBuffer(f, id) {
      let blob = new Blob([f.data])
      return this.uploadFile(blob, id)
   }
   uploadFile(file, id: string): Promise<any> {
      return new Promise(async (resolve, reject) => {
         try {
            this.appSrv.showLoading()
            let data = (file instanceof File) ? file : file.data
            const stPath = id + '/' + file.name
            const sn = await this.pushUpload(data, stPath)
            const url = await sn.ref.getDownloadURL()

            const res = new Object()
            res['url'] = url
            res['nombre'] = sn.ref.name
            res['extension'] = sn.ref.name.substr(sn.ref.name.indexOf('.') + 1)
            
            this.appSrv.hideLoading()
            resolve(res)
         } catch (error) {
            console.log(error)
            this.appSrv.hideLoading()
            reject(error)
         }
      })
   }

   private pushUpload(data, stPath) {
      let storageRef = firebase.storage().ref()
      this.uploadTask = storageRef.child(stPath).put(data)

      this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
         //attachment.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      }, error => {
         console.log('upload file error: ', error)
      })
      return this.uploadTask
   }
   deleteFileStorage(id, name: string) {
      return new Promise((resolve, reject) => {
         this.appSrv.showLoading()
         const storageRef = firebase.storage().ref()
         const stPath = id + '/' + name
         try {
            storageRef.child(stPath).delete()
            this.appSrv.hideLoading()
            resolve(true)
         } catch (error) {
            console.log('Error deleting file: ', error)
            this.appSrv.hideLoading()
            resolve(false)
         }
      })
   }



   // async startSpinner() {
   //    this.loading = await this.loadingCtrl.create({
   //       spinner: "bubbles",
   //       // message: 'cargando...'
   //    })
   //    await this.loading.present()
   // }
   // stopSpinner(){
   //    this.loading.dismiss()
   // }


   // uploadPic(dni, upload) {
   //    const newName = upload.file.name //`${new Date().getTime()}`
   //    const stPath = dni + '/' + newName
   //    const uploadTask = this.afStorage.upload(stPath, upload.file)
   //    return uploadTask
   // }

   // deleteFile(file) {
   //    let key = file.key
   //    let storagePath = file.fullPath
   //    this.afStorage.ref(storagePath).delete()
   // }
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
