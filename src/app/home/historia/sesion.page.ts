import { Component, OnInit, OnDestroy } from '@angular/core'
import { GlobalService } from 'fwk4-services'
import { ModalController, NavParams, AlertController } from '@ionic/angular'
import { AngularFirestore } from '@angular/fire/firestore'
import * as moment from 'moment'
import { FbsService } from 'src/app/fbs.service'
import { Subscription } from 'rxjs'


@Component({
   selector: 'app-sesion',
   templateUrl: './sesion.page.html',
   styleUrls: ['./sesion.page.scss'],
})
export class SesionPage implements OnInit, OnDestroy {
   patient:any
   session: any
   fechaSesion:any
   attachments:any

   private sub: Subscription
   private sessionsPath:string = ''
   private sessionAttachmentsPath:string = ''
   private attachmentsPath:string = ''

   constructor(
      private alertCtrl: AlertController,
      private navParams: NavParams,
      private modalController: ModalController,
      private globalSrv: GlobalService,
      private afs: AngularFirestore,
      private fbsSrv: FbsService
   ) {
      console.log('SesionPage constructor')
   }

   async ngOnInit() {
      this.patient = await this.globalSrv.getItem('patient')
      this.session = this.navParams.get('sessionDetail')
      this.fechaSesion = moment(this.session.fecha).format("DD/MM/YYYY")

      this.attachmentsPath = 'pacientes/'+this.patient.id+'/adjuntos'
      this.sessionAttachmentsPath = 'pacientes/'+this.patient.id+'/sesiones/'+this.session.id+'/adjuntos'

      this.sub = this.afs.collection(this.sessionAttachmentsPath).valueChanges({idField:'id'}).subscribe(ats=>{
         this.attachments = ats
      })
   }
   ngOnDestroy(){
      this.sub.unsubscribe()
   }
   onObsChanged(ev){
      this.session.observaciones = ev.target.value
   }
   onNotasChanged(ev){
      this.session.notas = ev.target.value
   }
   handleFile(files: FileList) {
      this.fbsSrv.uploadFile(files.item(0), this.patient.dni).then(obj=>{
         this.saveAttachment(obj)
      })
   }
   isImage(ext){
      let flag = false
      if ((ext == 'png')||(ext == 'jpg')||(ext == 'jpeg')||(ext == 'gif'))
         flag = true
      return flag
   }
   openFile(url){
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
              this.fbsSrv.deleteFileStorage(this.patient.dni, adj.nombre)
              await this.afs.doc(this.sessionAttachmentsPath+'/'+adj.id).delete()
              await this.afs.doc(this.attachmentsPath+'/'+adj.id).delete()
            }
          }
        ]
      })
      await alert.present();
    }

   async save() {
      this.session.fecha = moment(this.fechaSesion).valueOf()
      if (this.session.id)
         await this.afs.doc(this.sessionsPath+'/'+this.session.id).set(this.session, { merge: true })
      else
         await this.afs.collection(this.sessionsPath).add(this.session)

      this.modalController.dismiss()
   }
   cancel() {
      this.modalController.dismiss()
   }
   async saveAttachment(obj:object){
      await this.afs.collection(this.sessionAttachmentsPath).add(obj)
      await this.afs.collection(this.attachmentsPath).add(obj)
   }
}
