import { Component } from '@angular/core'
import { Platform, ActionSheetController } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'
import { Router } from '@angular/router'
// import { FcmService } from './fcm.service';


@Component({
   selector: 'app-root',
   templateUrl: 'app.component.html'
})
export class AppComponent {

   constructor(
      //private fcm: FcmService,
      private router: Router,
      private actionSheetController: ActionSheetController,
      private platform: Platform,
      private splashScreen: SplashScreen,
      private statusBar: StatusBar
   ) {
      console.log('AppComponent constructor')
      this.initializeApp();
   }

   initializeApp() {
      this.platform.ready().then(() => {
         this.statusBar.styleDefault();
         this.splashScreen.hide();
      })
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

}
