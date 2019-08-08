import { Component } from '@angular/core'
import { Platform } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'
import { GlobalService } from 'fwk4-services'


@Component({
   selector: 'app-root',
   templateUrl: 'app.component.html'
})
export class AppComponent {

   constructor(
      private platform: Platform,
      private globalSrv: GlobalService,
      private splashScreen: SplashScreen,
      private statusBar: StatusBar
   ) {
      console.log('AppComponent constructor!!!')
      this.initializeApp();
   }

   async initializeApp() {
      const isMobile = !(this.platform.is('desktop'))
      await this.globalSrv.setItem('isMobile', isMobile)

      try {
         this.platform.ready().then(() => {
            this.statusBar.styleDefault()
            this.splashScreen.hide()
         })   
      } catch (error) {
         console.log('Error platform.ready()', error)
      }
   }
}
