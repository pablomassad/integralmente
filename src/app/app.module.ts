import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'

import { environment } from 'src/environments/environment'
import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { AngularFireStorageModule } from '@angular/fire/storage'

import { IonicStorageModule } from '@ionic/storage'

import { WebView } from '@ionic-native/ionic-webview/ngx'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
// import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'
import { FileOpener } from '@ionic-native/file-opener/ngx'
import { File } from '@ionic-native/file/ngx'
import { Chooser } from '@ionic-native/chooser/ngx'

@NgModule({
   declarations: [AppComponent],
   imports: [
      BrowserModule, 
      IonicModule.forRoot(), 
      IonicStorageModule.forRoot(),
      FormsModule,
      ReactiveFormsModule,
      AngularFireModule.initializeApp(environment.firebaseConfig), // imports firebase/app
      AngularFirestoreModule, // imports firebase/firestore
      AngularFireAuthModule, // imports firebase/auth
      AngularFireStorageModule, // imports firebase/storage
      AppRoutingModule, 
   ],
   providers: [
      StatusBar,
      SplashScreen,
      // InAppBrowser,
      FileOpener,
      Chooser,
      File,
      WebView,
      { provide: FirestoreSettingsToken, useValue: {} },
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
   ],
   bootstrap: [AppComponent]
})
export class AppModule { 
   constructor(){
      console.log('AppModule constructor')
   }
}
