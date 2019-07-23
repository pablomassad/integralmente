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
      const actionSheet = await this.actionSheetController.create({
         header: 'Opciones',
         buttons: [
            {
               text: 'Salir',
               icon: 'log-out',
               handler: () => {
                  this.authSrv.doLogout().then(x => {
                     this.route.navigate(['/login'])
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
}
