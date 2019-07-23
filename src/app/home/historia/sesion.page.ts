import { Component, OnInit, OnDestroy } from '@angular/core'
import { GlobalService, ApplicationService } from 'fwk4-services'
import { ModalController, NavParams, AlertController } from '@ionic/angular'
import { AngularFirestore } from '@angular/fire/firestore'
import * as moment from 'moment'
import { FbsService } from 'src/app/fbs.service'
import { Subscription } from 'rxjs'
import { Chooser } from '@ionic-native/chooser/ngx'
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'


@Component({
   selector: 'app-sesion',
   templateUrl: './sesion.page.html',
   styleUrls: ['./sesion.page.scss', '../../buttons.scss'],
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
      private iab: InAppBrowser,
      private chooser: Chooser,
      private alertCtrl: AlertController,
      private navParams: NavParams,
      private modalController: ModalController,
      private globalSrv: GlobalService,
      private appSrv: ApplicationService,
      private afs: AngularFirestore,
      private fbsSrv: FbsService
   ) {
      console.log('SesionPage constructor')
   }

   ngOnInit() {
      this.isMobile = this.globalSrv.getItemRAM('isMobile')
      this.patient = this.globalSrv.getItemRAM('patient')
      this.session = this.navParams.get('sessionDetail')
      this.fechaSesion = moment(this.session.fecha).format("MM/DD/YYYY")

      this.attachmentsPath = 'pacientes/' + this.patient.id + '/adjuntos'
      this.sessionsPath = 'pacientes/' + this.patient.id + '/sesiones/'
      this.sessionAttachmentsPath = this.sessionsPath + this.session.id + '/adjuntos'

      this.appSrv.showLoading()
      this.sub = this.afs.collection(this.sessionAttachmentsPath).valueChanges({ idField: 'id' }).subscribe(ats => {
         this.attachments = ats
         this.appSrv.hideLoading()
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
      return this.fbsSrv.shortName(n)
   }
   chooseFile() {
      this.chooser.getFile('*/*').then(f => {
         if (f){
            this.appSrv.showLoading()
            this.fbsSrv.uploadFile(f, this.patient.dni).then(obj => {
               this.saveAttachment(obj)
            })
         }
      })
      .catch(err=>{
         this.appSrv.hideLoading()
      })
   }
   handleFile(files: FileList) {
      this.appSrv.showLoading()
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
                  this.appSrv.showLoading()
                  this.fbsSrv.deleteFileStorage(this.patient.dni, adj.nombre)
                  await this.afs.doc(this.sessionAttachmentsPath + '/' + adj.id).delete()
                  await this.afs.doc(this.attachmentsPath + '/' + adj.id).delete()
                  this.appSrv.hideLoading()
               }
            }
         ]
      })
      await alert.present();
   }

   async save() {
      this.session.fecha = moment(this.fechaSesion).valueOf()
      if (this.session['id'] != undefined)
         await this.afs.doc(this.sessionsPath + this.session.id).set(this.session, { merge: true })
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
      this.appSrv.hideLoading()
   }
}
