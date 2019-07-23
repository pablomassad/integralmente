import { Component, OnInit, OnDestroy } from '@angular/core'
import { GlobalService, ApplicationService } from 'fwk4-services'
import { Router } from '@angular/router'
import * as moment from 'moment'
import { ActionSheetController } from '@ionic/angular'
import { AngularFirestore } from '@angular/fire/firestore'
import { FbsService } from '../fbs.service'
import { AuthService, UserModel } from 'fwk4-authentication';
import { Subscription } from 'rxjs';

@Component({
   selector: 'app-pacientes',
   templateUrl: './pacientes.page.html',
   styleUrls: ['./pacientes.page.scss', '../buttons.scss'],
})
export class PacientesPage implements OnInit, OnDestroy {
   sub: Subscription
   user:UserModel
   criteria: string
   patients: any = []

   constructor(
      private route: Router,
      private afs: AngularFirestore,
      private globalSrv: GlobalService,
      private appSrv: ApplicationService,
      private fbsSrv: FbsService
   ) {
      console.log('PacientesPage constructor')
   }

   async ngOnInit() {
      this.user = await this.globalSrv.getItem('userInfo')
      this.appSrv.showLoading()
      this.sub = this.afs.collection('pacientes', ref => ref.where('uid', '==', this.user.uid)).valueChanges({ idField: 'id' }).subscribe(ps => {
         this.patients = ps
         this.appSrv.hideLoading()
      })
   }
   ngOnDestroy(){
      this.sub.unsubscribe()
   }
   async removePatient(p) {
      this.appSrv.showLoading()
      await this.afs.collection('pacientes').doc(p.id).delete()
      this.appSrv.hideLoading()
   }
   async gotoPatient(p) {
      await this.globalSrv.setItem('patient', p)
      this.route.navigate(["/menu/home/ficha"])
   }

   evalEdad(nac) {
      const today = moment()
      const cumple = moment(nac)
      const edad = today.diff(cumple, 'y')
      return edad + " años"
   }
}
