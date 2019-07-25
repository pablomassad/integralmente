import { Component, OnInit } from '@angular/core'
import { ActionSheetController, ModalController } from '@ionic/angular'
import { AuthService, UserModel } from 'fwk4-authentication'
import { Router } from '@angular/router'
import { EditionPage } from './edition.page'

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
            handler: () => { this.gotoEdition() }
         },
         {
            text: 'Salir',
            icon: 'log-out',
            handler: () => { this.logout() }
         },
         {
            text: 'Cancelar',
            icon: 'close',
            role: 'cancel',
            handler: () => {
               console.log('Cancelar')
            }
         }
      ]

      const actionSheet = await this.actionSheetController.create({
         header: 'Opciones',
         buttons: menuOptions
      });
      await actionSheet.present();
   }


   private async gotoEdition() {
      const modal = await this.modalController.create({
         component: EditionPage,
         componentProps: {}
      })
      return await modal.present()
   }
   private async logout() {
      await this.authSrv.doLogout()
      console.log('Logout')
      this.route.navigate(['/login'])
   }
}
