import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {RouteReuseStrategy} from '@angular/router'

import {IonicModule, IonicRouteStrategy} from '@ionic/angular'
import {SplashScreen} from '@ionic-native/splash-screen/ngx'
import {StatusBar} from '@ionic-native/status-bar/ngx'

import {AppComponent} from './app.component'
import {AppRoutingModule} from './app-routing.module'

import {environment} from '../environments/environment'

import {AngularFireModule} from '@angular/fire'
import {AngularFirestoreModule, FirestoreSettingsToken} from '@angular/fire/firestore'
import {AngularFireStorageModule} from '@angular/fire/storage'
import {AngularFireAuthModule} from '@angular/fire/auth'

import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import {IonicStorageModule} from '@ionic/storage'
import {WebView} from '@ionic-native/ionic-webview/ngx'
import {File} from '@ionic-native/file/ngx'
import {Chooser} from '@ionic-native/chooser/ngx'
import {FileOpener} from '@ionic-native/file-opener/ngx'
import {FileTransfer} from '@ionic-native/file-transfer/ngx'
import {FCM} from '@ionic-native/fcm/ngx'


export const firebaseCredentials = {
    apiKey: "AIzaSyBA1Bkh-HjZzwBiokJrtdXvd6E0UhVR-pE",
    authDomain: "pp-integralmente.firebaseapp.com",
    databaseURL: "https://pp-integralmente.firebaseio.com",
    projectId: "pp-integralmente",
    storageBucket: "pp-integralmente.appspot.com",
    messagingSenderId: "857389537904",
    appId: "1:857389537904:web:6265e500632eae90"
};
console.log(environment.firebaseConfig)

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(firebaseCredentials),
        AngularFirestoreModule, 
        AngularFireStorageModule, 
        AngularFireAuthModule, 
        AppRoutingModule
    ],
    providers: [
        FCM,
        StatusBar,
        SplashScreen,
        Chooser,
        File,
        FileOpener,
        FileTransfer,
        WebView,
        {provide: FirestoreSettingsToken, useValue: {}},
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor () {
        console.log('AppModule constructor')
    }
}
