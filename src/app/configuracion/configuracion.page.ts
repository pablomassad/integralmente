import { Component, OnInit, OnDestroy } from '@angular/core'
import { GlobalService, ApplicationService } from 'fwk4-services'
import { FbsService } from '../fbs.service'
import { AngularFirestore } from '@angular/fire/firestore'
import { Subscription } from 'rxjs'
import { ModalController, AlertController } from '@ionic/angular';
import { UserPage } from './user.page';

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
      private alertCtrl:AlertController,
      private fbsSrv: FbsService,
      private afs: AngularFirestore,
      private modalCtrl: ModalController
   ) {
      console.log('ConfiguracionPage constructor')
   }

   async ngOnInit() {
      this.sub = this.afs.collection('users').valueChanges({ idField: 'id' }).subscribe(ps => {
         this.users = ps
      })
   }
   ngOnDestroy(){
      this.sub.unsubscribe()
   }
   async removeUser(usr) {
      const alert = await this.alertCtrl.create({
         header: 'Confirma eliminacion de cuenta',
         message: 'Esta seguro?',
         buttons: [
            {
               text: 'Cancel',
               role: 'cancel',
               cssClass: 'secondary',
               handler: (blah) => {
                  console.log('Delete cancelled');
               }
            }, {
               text: 'Okay',
               handler: async () => {
                  console.log('Delete confirmed')
                  await this.fbsSrv.deleteFileStorage('users', usr.nombre)
                  await this.afs.doc('users/' + usr.id).delete()
               }
            }
         ]
      })
      await alert.present()
   }

   async gotoUser(usr){
      const modal = await this.modalCtrl.create({
         component: UserPage,
         componentProps: {
            'user':usr
          }
      })
      return await modal.present()
   }

}
