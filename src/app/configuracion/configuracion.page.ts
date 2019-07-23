import { Component, OnInit, OnDestroy } from '@angular/core'
import { GlobalService, ApplicationService } from 'fwk4-services'
import { FbsService } from '../fbs.service'
import { AngularFirestore } from '@angular/fire/firestore'
import { Subscription } from 'rxjs'

@Component({
   selector: 'app-configuracion',
   templateUrl: './configuracion.page.html',
   styleUrls: ['./configuracion.page.scss', '../buttons.scss'],
})
export class ConfiguracionPage implements OnInit, OnDestroy {
   sub:Subscription
   users:any=[]

   constructor(
      private appSrv: ApplicationService,
      private afs: AngularFirestore
   ) {
      console.log('ConfiguracionPage constructor')
   }

   async ngOnInit() {

      this.appSrv.showLoading()
      this.sub = this.afs.collection('users').valueChanges({ idField: 'id' }).subscribe(ps => {
         this.users = ps
         this.appSrv.hideLoading()
      })
   }
   ngOnDestroy(){
      this.sub.unsubscribe()
   }

}
