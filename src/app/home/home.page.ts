import { Component, OnInit } from '@angular/core'
import { GlobalService } from 'fwk4-services'

@Component({
   selector: 'app-home',
   templateUrl: 'home.page.html',
   styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

   userPhoto: any
   patient:any;

   constructor(
      private globalSrv: GlobalService
   ) {
      console.log('HomePage constructor')
      this.userPhoto = "assets/users/pato.jpg"  //"assets/images/anonymous.png"
   }

   ngOnInit(){
      this.patient = this.globalSrv.getItemRAM('patient')
      if (this.patient &&  !this.patient.foto)
         this.patient.foto = "assets/images/anonymous.png"
   }

   access(act) {
      //let flag = ((this.user.actions.indexOf(act) != -1)||(this.master==true))
      let flag = true
      return flag
   }
}
