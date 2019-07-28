import { Component, OnInit, OnDestroy } from '@angular/core'
import { GlobalService } from 'fwk4-services'
import { ModalController } from '@ionic/angular'
import { SesionPage } from './sesion.page'
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

@Component({
   selector: 'app-historia',
   templateUrl: './historia.page.html',
   styleUrls: ['./historia.page.scss'],
})
export class HistoriaPage implements OnInit, OnDestroy {
   sub: Subscription
   patient: any
   sessions: any = []
   criteria:string

   constructor(
      private modalController: ModalController,
      private afs: AngularFirestore,
      private globalSrv: GlobalService
   ) {
      console.log('HistoriaPage constructor')
   }

   ngOnInit() {
      this.patient = this.globalSrv.getItemRAM('patient')
      this.sub = this.afs.collection('pacientes').doc(this.patient.id).collection('sesiones').valueChanges({ idField: 'id' }).subscribe(ses=>{
         this.sessions = ses 
      }) 
   }
   ngOnDestroy(){
      this.sub.unsubscribe()
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
