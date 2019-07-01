import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { AngularFireStorageModule } from '@angular/fire/storage'

import { Firebase } from '@ionic-native/firebase/ngx'

import { environment } from 'src/environments/environment'


@NgModule({
   declarations: [AppComponent],
   entryComponents: [],
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
      ImagePicker,
      Firebase,
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
