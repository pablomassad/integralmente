import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'fwk4-services';

@Component({
   selector: 'app-historia',
   templateUrl: './historia.page.html',
   styleUrls: ['./historia.page.scss'],
})
export class HistoriaPage implements OnInit {
   patient:any
   sessions: any = []

   constructor(
      private globalSrv: GlobalService
   ) {
      console.log('HistoriaPage constructor')
   }

   async ngOnInit() {
      this.patient = await this.globalSrv.getItem('patient')
      this.sessions = this.patient.historia
   }

}
