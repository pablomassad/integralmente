import { Component, OnInit } from '@angular/core'
import { GlobalService, ApplicationService } from 'fwk4-services'
import { AngularFirestore } from '@angular/fire/firestore'
import { Subscription } from 'rxjs'
import { FbsService } from 'fwk4-authentication'
import { AlertController } from '@ionic/angular'
import { Chooser, ChooserResult } from '@ionic-native/chooser/ngx'
import { FileOpener } from '@ionic-native/file-opener/ngx'
import { FileTransfer } from '@ionic-native/file-transfer/ngx'
import { File } from '@ionic-native/file/ngx'

@Component({
   selector: 'app-docs',
   templateUrl: './docs.page.html',
   styleUrls: ['./docs.page.scss'],
})
export class DocsPage implements OnInit {
   private fileInfo:any
   patient: any
   session: any
   attachments: any = []
   pendingAttachments: any = []
   isMobile: boolean


   private sub: Subscription
   private sessionsPath: string = ''
   private sessionAttachmentsPath: string
   private attachmentsPath: string = ''

   constructor(
      private chooser: Chooser,
      private fileTransfer: FileTransfer,
      private fileOpener: FileOpener,
      private alertCtrl: AlertController,
      private globalSrv: GlobalService,
      private afs: AngularFirestore,
      private fbsSrv: FbsService
   ) {
      console.log('DocsPage constructor')
   }

   async ngOnInit() {
      this.isMobile = this.globalSrv.getItemRAM('isMobile')
      this.patient = this.globalSrv.getItemRAM('patient')
      this.attachmentsPath = 'pacientes/' + this.patient.id + '/adjuntos'

      this.sub = this.afs.collection(this.attachmentsPath).valueChanges({ idField: 'id' }).subscribe(ats => {
         this.attachments = ats
      })
   }
   ngOnDestroy() {
      this.sub.unsubscribe()
   }
   shortName(n) {
      return this.fbsSrv.shortName(n)
   }
   chooseFileBrowser(ev) {
      this.fileInfo = ev.target.files[0]
      this.saveAttachment()
   }
   async chooseFileMobile() {
      this.fileInfo = await this.chooser.getFile('*/*')
      this.saveAttachment()
   }
   isImage(ext) {
      let flag = false
      if ((ext == 'png') || (ext == 'jpg') || (ext == 'jpeg') || (ext == 'gif'))
         flag = true
      return flag
   }
   openFile(url) {
      if (this.isMobile)
         this.fileOpener.open(url, '')
      else
         window.open(url, '_system', 'location=yes')
   }
   download(adj) {
      let o = this.fileTransfer.create()
      o.download(adj.url, '/integralmente')
         .then(x => {
            console.log('descargado! ', x)
         })
         .catch(err => {
            console.log('error en descarga: ', err)
         })
   }
   async removeFile(adj) {
      const alert = await this.alertCtrl.create({
         header: 'Confirma borrado',
         message: 'Esta seguro?',
         buttons: [
            {
               text: 'Cancel',
               role: 'cancel',
               cssClass: 'secondary',
               handler: (blah) => {
                  console.log('Confirm Cancel');
               }
            }, {
               text: 'Okay',
               handler: async () => {
                  console.log('Confirm Okay')
                  await this.fbsSrv.deleteFileStorage(this.patient.id, adj.nombre)

                  if (adj.idSession) {
                     this.sessionAttachmentsPath = 'pacientes/' + this.patient.id + '/sesiones/' + adj.idSesion + '/adjuntos'
                     await this.afs.doc(this.sessionAttachmentsPath + '/' + adj.id).delete()
                  }
                  await this.afs.doc(this.attachmentsPath + '/' + adj.id).delete()
               }
            }
         ]
      })
      await alert.present();
   }
   async saveAttachment() {
      if (this.fileInfo) {
         let obj = await this.fbsSrv.uploadFile(this.fileInfo, this.patient.id)
         const id = new Date().getTime().toString()
         await this.afs.collection(this.attachmentsPath).doc(id).set(obj)
         //await this.afs.collection(this.sessionAttachmentsPath).doc(id).set(obj)
      }
   }
}
