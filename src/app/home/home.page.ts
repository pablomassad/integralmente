import { Component, OnInit } from '@angular/core'
import { GlobalService } from 'fwk4-services'

@Component({
   selector: 'app-home',
   templateUrl: 'home.page.html',
   styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

   patient:any;

   constructor(
      private globalSrv: GlobalService
   ) {
      console.log('HomePage constructor')
   }

   ngOnInit(){
      this.globalSrv.getItem('curPatient').then(x=>{
         this.patient = x
      })
   }

   access(act) {
      //let flag = ((this.user.actions.indexOf(act) != -1)||(this.master==true))
      let flag = true
      return flag
   }
}
