import { Component, OnInit, OnDestroy } from '@angular/core'
import { GlobalService } from 'fwk4-services'
import { ModalController, NavParams, AlertController } from '@ionic/angular'
import { AngularFirestore } from '@angular/fire/firestore'
import * as moment from 'moment'
import { FbsService } from 'src/app/fbs.service'
import { Subscription } from 'rxjs'
import { Chooser } from '@ionic-native/chooser/ngx'


@Component({
   selector: 'app-sesion',
   templateUrl: './sesion.page.html',
   styleUrls: ['./sesion.page.scss'],
})
export class SesionPage implements OnInit, OnDestroy {
   patient: any
   session: any
   fechaSesion: any
   attachments: any
   sessionType: string = 'sessions'
   isMobile: boolean

   private sub: Subscription
   private sessionsPath: string = ''
   private sessionAttachmentsPath: string = ''
   private attachmentsPath: string = ''

   constructor(
      private chooser: Chooser,
      private alertCtrl: AlertController,
      private navParams: NavParams,
      private modalController: ModalController,
      private globalSrv: GlobalService,
      private afs: AngularFirestore,
      private fbsSrv: FbsService
   ) {
      console.log('SesionPage constructor')
   }

   ngOnInit() {
      this.isMobile = this.globalSrv.getItemRAM('isMobile')
      this.patient = this.globalSrv.getItemRAM('patient')
      this.session = this.navParams.get('sessionDetail')
      this.fechaSesion = moment(this.session.fecha).format("DD/MM/YYYY")

      this.attachmentsPath = 'pacientes/' + this.patient.id + '/adjuntos'
      this.sessionAttachmentsPath = 'pacientes/' + this.patient.id + '/sesiones/' + this.session.id + '/adjuntos'

      this.fbsSrv.startSpinner()
      this.sub = this.afs.collection(this.sessionAttachmentsPath).valueChanges({ idField: 'id' }).subscribe(ats => {
         this.attachments = ats
         this.fbsSrv.stopSpinner()
      })
   }
   ngOnDestroy() {
      this.sub.unsubscribe()
   }
   onSegmentChanged(ev) {
      this.sessionType = ev.target.value
   }
   onObsChanged(ev) {
      this.session.observaciones = ev.target.value
   }
   onNotasChanged(ev) {
      this.session.notas = ev.target.value
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
   chooseFile() {
      this.chooser.getFile('*/*').then(f => {
         this.fbsSrv.startSpinner()
         this.fbsSrv.uploadFile(f, this.patient.dni).then(obj => {
            this.saveAttachment(obj)
         })
      })
   }
   handleFile(files: FileList) {
      this.fbsSrv.startSpinner()
      this.fbsSrv.uploadFile(files.item(0), this.patient.dni).then(obj => {
         this.saveAttachment(obj)
      })
   }
   isImage(ext) {
      let flag = false
      if ((ext == 'png') || (ext == 'jpg') || (ext == 'jpeg') || (ext == 'gif'))
         flag = true
      return flag
   }
   openFile(url) {
      window.open(url, '_blank')
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
                  this.fbsSrv.startSpinner()
                  this.fbsSrv.deleteFileStorage(this.patient.dni, adj.nombre)
                  await this.afs.doc(this.sessionAttachmentsPath + '/' + adj.id).delete()
                  await this.afs.doc(this.attachmentsPath + '/' + adj.id).delete()
                  this.fbsSrv.stopSpinner()
               }
            }
         ]
      })
      await alert.present();
   }

   async save() {
      this.session.fecha = moment(this.fechaSesion).valueOf()
      if (this.session.id)
         await this.afs.doc(this.sessionsPath + '/' + this.session.id).set(this.session, { merge: true })
      else
         await this.afs.collection(this.sessionsPath).add(this.session)

      this.modalController.dismiss()
   }
   cancel() {
      this.modalController.dismiss()
   }
   async saveAttachment(obj: object) {
      obj['idSesion'] = this.session.id
      const id = new Date().getTime().toString()
      await this.afs.collection(this.sessionAttachmentsPath).doc(id).set(obj)
      await this.afs.collection(this.attachmentsPath).doc(id).set(obj)
      this.fbsSrv.stopSpinner()
   }
}
