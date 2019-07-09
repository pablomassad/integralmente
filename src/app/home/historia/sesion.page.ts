import { Component, OnInit } from '@angular/core'
import { GlobalService } from 'fwk4-services'
import { ModalController, NavParams } from '@ionic/angular'
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
   selector: 'app-sesion',
   templateUrl: './sesion.page.html',
   styleUrls: ['./sesion.page.scss'],
})
export class SesionPage implements OnInit {
   patient:any
   session: any

   constructor(
      private navParams: NavParams,
      private modalController: ModalController,
      private globalSrv: GlobalService,
      private afs: AngularFirestore
   ) {
      console.log('SesionPage constructor')
   }

   async ngOnInit() {
      this.session = this.navParams.get('sessionDetail')
      this.patient = await this.globalSrv.getItem('patient')
   }

   save() {
      if (this.session.id)
         this.afs.collection('pacientes').doc(this.patient.id).collection('sesiones').doc(this.session.id).set(this.session, { merge: true })
      else
         this.afs.collection('pacientes').doc(this.patient.id).collection('sesiones').add(this.session)

      this.modalController.dismiss()
   }
   cancel() {
      this.modalController.dismiss()
   }
}
