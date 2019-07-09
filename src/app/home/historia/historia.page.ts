import { Component, OnInit } from '@angular/core'
import { GlobalService } from 'fwk4-services'
import { ModalController } from '@ionic/angular'
import { SesionPage } from './sesion.page'

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
      private globalSrv: GlobalService
   ) {
      console.log('HistoriaPage constructor')
   }

   async ngOnInit() {
      this.patient = await this.globalSrv.getItem('patient')
      this.sessions = this.patient.historia
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
