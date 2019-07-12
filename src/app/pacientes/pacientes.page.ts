import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'fwk4-services';
import { Router } from '@angular/router'
import * as moment from 'moment'
import { ActionSheetController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
   selector: 'app-pacientes',
   templateUrl: './pacientes.page.html',
   styleUrls: ['./pacientes.page.scss'],
})
export class PacientesPage implements OnInit {

   userPhoto: any
   criteria:string
   patients: any = []

   constructor(
      private actionSheetController: ActionSheetController,
      private router:Router,
      private afs: AngularFirestore,
      private globalSrv: GlobalService
   ) {
      console.log('PacientesPage constructor')
      this.userPhoto = "assets/users/pato.jpg" //"assets/images/anonymous.png"
   }

   async ngOnInit() {
      this.afs.collection('pacientes').valueChanges({ idField: 'id' }).subscribe(ps=>{
         this.patients = ps 
      }) 
   }
   removePatient(p){
      this.afs.collection('pacientes').doc(p.id).delete()
   }
   async openMenuSheet() {
      const actionSheet = await this.actionSheetController.create({
         header: 'Opciones',
         buttons: [
            {
               text: 'Salir',
               icon: 'log-out',
               handler: () => {
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

   async gotoPatient(p){
      await this.globalSrv.setItem('patient', p)
      this.router.navigate(["/menu/home/ficha"])
   }

   evalEdad(nac){
      const today = moment()
      const cumple = moment(nac)
      const edad = today.diff(cumple, 'y')
      return edad + " años"
   }
}
