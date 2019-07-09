import { Component, OnInit } from '@angular/core'
import { GlobalService } from 'fwk4-services'
import { ModalController } from '@ionic/angular'
import { SesionPage } from './sesion.page'
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
   selector: 'app-historia',
   templateUrl: './historia.page.html',
   styleUrls: ['./historia.page.scss'],
})
export class HistoriaPage implements OnInit {
   patient: any
   sessions: any = []

   constructor(
      private modalController: ModalController,
      private afs: AngularFirestore,
      private globalSrv: GlobalService
   ) {
      console.log('HistoriaPage constructor')
   }

   async ngOnInit() {
      this.patient = await this.globalSrv.getItem('patient')
      this.afs.collection('pacientes').doc(this.patient.id).collection('sesiones').valueChanges({ idField: 'id' }).subscribe(ses=>{
         this.sessions = ses 
      }) 
   }

   async gotoSession(s) {
      const modal = await this.modalController.create({
         component: SesionPage,
         componentProps: {
            'sessionDetail':s
          }
      })
      return await modal.present()
   }

}
