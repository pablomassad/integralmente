import { Component, OnInit } from '@angular/core'
import { GlobalService } from 'fwk4-services'
import { Router } from '@angular/router'
import * as moment from 'moment'
import { ActionSheetController } from '@ionic/angular'
import { AngularFirestore } from '@angular/fire/firestore'
import { FbsService } from '../fbs.service'
import { AuthService } from 'fwk4-authentication';

@Component({
   selector: 'app-pacientes',
   templateUrl: './pacientes.page.html',
   styleUrls: ['./pacientes.page.scss', '../buttons.scss'],
})
export class PacientesPage implements OnInit {

   userPhoto: any
   criteria: string
   patients: any = []

   constructor(
      private actionSheetController: ActionSheetController,
      private route: Router,
      private afs: AngularFirestore,
      private authSrv: AuthService,
      private globalSrv: GlobalService,
      private fbsSrv: FbsService
   ) {
      console.log('PacientesPage constructor')
      this.userPhoto = "assets/users/pato.jpg" //"assets/images/anonymous.png"
   }

   async ngOnInit() {
      this.fbsSrv.startSpinner()
      this.afs.collection('pacientes').valueChanges({ idField: 'id' }).subscribe(ps => {
         this.patients = ps
         this.fbsSrv.stopSpinner()
      })
   }
   async removePatient(p) {
      this.fbsSrv.startSpinner()
      await this.afs.collection('pacientes').doc(p.id).delete()
      this.fbsSrv.stopSpinner()
   }
   async openMenuSheet() {
      const actionSheet = await this.actionSheetController.create({
         header: 'Opciones',
         buttons: [
            {
               text: 'Salir',
               icon: 'log-out',
               handler: () => {
                  this.authSrv.doLogout().then(x => {
                     this.route.navigate([''])
                  })
                  console.log('Logout');
               }
            }, {
               text: 'Cancelar',
               icon: 'close',
               role: 'cancel',
               handler: () => {
                  console.log('Cancelar');
               }
            }]
      });
      await actionSheet.present();
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
