import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'fwk4-services';
import { ActionSheetController } from '@ionic/angular';
import { AuthService } from 'fwk4-authentication';
import { Router } from '@angular/router';

@Component({
   selector: 'app-tool-head',
   templateUrl: './tool-head.component.html',
   styleUrls: ['./tool-head.component.scss'],
})
export class ToolHeadComponent implements OnInit {

   user: any
   constructor(
      private authSrv: AuthService,
      private route: Router, 
      private actionSheetController: ActionSheetController,
      private globalSrv: GlobalService
   ) {
      console.log('ToolHeadComponent constructor')
   }

   async ngOnInit() {
      this.user = await this.globalSrv.getItem('userInfo')
   }

   async openMenuSheet() {
      const menuOptions = [
         {
            text: 'Editar Perfil',
            icon: 'person',
            handler: () => {
               console.log('Edit User');
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
         }
      ]

      if (this.user.isAdmin == true)
         menuOptions.push({
            text: 'Administrar Usuarios',
            icon: 'people',
            handler: () => {
               console.log('Admin Users');
            }
         })

      menuOptions.push({
         text: 'Cancelar',
         icon: 'close',
         handler: () => {
            console.log('Cancelar');
         }
      })

      const actionSheet = await this.actionSheetController.create({
         header: 'Opciones',
         buttons: menuOptions
      });
      await actionSheet.present();
   }
}
