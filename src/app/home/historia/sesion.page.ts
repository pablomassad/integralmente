import { Component, OnInit, OnDestroy } from '@angular/core'
import { GlobalService } from 'fwk4-services'
import { ModalController, NavParams } from '@ionic/angular'
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
   fileToUpload: File = null

   sub: Subscription

   constructor(
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
      const path = 'pacientes/'+this.patient.id+'/sesiones/'+this.session.id+'/adjuntos'
      this.sub = this.afs.collection(path).valueChanges().subscribe(ats=>{
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
   addAttachment(){

   }
   handleFile(files: FileList) {
      this.fbsSrv.uploadFile(files.item(0), this.patient.dni).then(obj=>{
         this.saveAttachment(obj)
      })
   }

   async save() {
      this.session.fecha = moment(this.fechaSesion).valueOf()
      if (this.session.id)
         await this.afs.collection('pacientes').doc(this.patient.id).collection('sesiones').doc(this.session.id).set(this.session, { merge: true })
      else
         await this.afs.collection('pacientes').doc(this.patient.id).collection('sesiones').add(this.session)

      this.modalController.dismiss()
   }
   cancel() {
      this.modalController.dismiss()
   }
   async saveAttachment(obj){
      const sessionPath = 'pacientes/'+this.patient.id+'/sesiones/'+this.session.id+'/adjuntos'
      await this.afs.collection(sessionPath).add(obj)

      const patientAttachmentsPath = 'pacientes/'+this.patient.id+'/adjuntos'
      await this.afs.collection(patientAttachmentsPath).add(obj)
   }
}
