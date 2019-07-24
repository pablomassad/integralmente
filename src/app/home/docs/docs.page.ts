import { Component, OnInit } from '@angular/core'
import { GlobalService, ApplicationService } from 'fwk4-services'
import { AngularFirestore } from '@angular/fire/firestore'
import { Subscription } from 'rxjs'
import { FbsService } from 'src/app/fbs.service'
import { AlertController } from '@ionic/angular'
import { Chooser } from '@ionic-native/chooser/ngx'
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'


@Component({
   selector: 'app-docs',
   templateUrl: './docs.page.html',
   styleUrls: ['./docs.page.scss', '../../buttons.scss'],
})
export class DocsPage implements OnInit {

   patient: any
   session: any
   attachments: any
   isMobile: boolean


   private sub: Subscription
   private sessionsPath: string = ''
   private sessionAttachmentsPath: string
   private attachmentsPath: string = ''

   constructor(
      private iab: InAppBrowser,
      private chooser: Chooser,
      private alertCtrl: AlertController,
      private globalSrv: GlobalService,
      private appSrv: ApplicationService,
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
   chooseFile() {
      this.chooser.getFile('*/*')
         .then(async f => {
            if (f) {
               const obj = await this.fbsSrv.uploadFile(f, this.patient.dni)
               this.saveAttachment(obj)
            }
         })
         .catch(err => {
            this.appSrv.message('Ocurrio un error al seleccionar adjunto', 'error')
            console.log('Error adjunto: ', err)
         })
   }
   async handleFile(files: FileList) {
      if (files) {
         const obj = await this.fbsSrv.uploadFile(files.item(0), this.patient.dni)
         this.saveAttachment(obj)
      }
   }
   isImage(ext) {
      let flag = false
      if ((ext == 'png') || (ext == 'jpg') || (ext == 'jpeg') || (ext == 'gif'))
         flag = true
      return flag
   }
   openFile(url) {
      this.iab.create(url, '_system')
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
                  this.fbsSrv.deleteFileStorage(this.patient.dni, adj.nombre)

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


   async saveAttachment(adj: any) {
      const id = new Date().getTime().toString()
      if (adj.idSesion) {
         this.sessionAttachmentsPath = 'pacientes/' + this.patient.id + '/sesiones/' + adj.idSesion + '/adjuntos'
         await this.afs.collection(this.sessionAttachmentsPath).doc(id).set(adj)
      }
      await this.afs.collection(this.attachmentsPath).doc(id).set(adj)
   }
}
