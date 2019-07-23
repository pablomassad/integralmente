import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'fwk4-services';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { AuthService, UserModel } from 'fwk4-authentication';
import { Router } from '@angular/router';
import { EditionPage } from './edition.page';

@Component({
   selector: 'app-tool-head',
   templateUrl: './tool-head.component.html',
   styleUrls: ['./tool-head.component.scss'],
})
export class ToolHeadComponent implements OnInit {
   user: UserModel

   constructor(
      private modalController: ModalController,
      private authSrv: AuthService,
      private route: Router,
      private actionSheetController: ActionSheetController
   ) {
      console.log('ToolHeadComponent constructor')
   }

   async ngOnInit() {
      this.user = await this.authSrv.loggedUser()
   }

   async openMenuSheet() {
      const menuOptions = [
         {
            text: 'Editar Perfil',
            icon: 'person',
            handler: async () => {
               const modal = await this.modalController.create({
                  component: EditionPage,
                  componentProps: {}
               })
               return await modal.present()
            }
         },
         {
            text: 'Salir',
            icon: 'log-out',
            handler: () => {
               this.authSrv.doLogout().then(x => {
                  this.route.navigate(['/login'])
               })
               console.log('Logout');
            }
         },
         {
            text: 'Cancelar',
            icon: 'close',
            role: 'Cancel',
            handler: () => {
               console.log('Cancelar');
            }
         }
      ]

      menuOptions.push()

      const actionSheet = await this.actionSheetController.create({
         header: 'Opciones',
         buttons: menuOptions
      });
      await actionSheet.present();
   }
}
