import {Component, OnInit} from '@angular/core'
import {Router, RouterEvent} from '@angular/router'
import {Platform} from '@ionic/angular'
import {GlobalService, ApplicationService} from 'fwk4-services'
import {AngularFirestore} from '@angular/fire/firestore'
import {FCM} from '@ionic-native/fcm/ngx'
// import {FCMService} from '../fcm.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.page.html',
    styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
    selectedPath = '/menu/pacientes'
    pages = [
        {
            title: "Pacientes",
            url: "/menu/pacientes"
        }
    ]

    constructor (
        private platform: Platform,
        private afs:AngularFirestore,
        private fcm: FCM,
        private appSrv: ApplicationService,
        private globalSrv: GlobalService,
        private router: Router
    ) {
        console.log('MenuPage constructor')
        this.router.events.subscribe((event: RouterEvent) => {
            if (event && event.url && (event.url != '')) {
                this.selectedPath = event.url
            }
        })
    }

    async ngOnInit() {
        await this.appSrv.loading(true)
        const usr = await this.globalSrv.getItem('userInfo')
        await this.appSrv.loading(false)

        if (usr.isAdmin) {
            this.pages.push({
                title: "Facturación",
                url: "/menu/facturacion"
            })
            this.pages.push({
                title: "Configuración",
                url: "/menu/configuracion"
            })
        }

        const isMobile = !(this.platform.is('desktop'))
        if (isMobile) {
            this.appSrv.message('topic: '+usr.id, 'info')
            this.fcm.subscribeToTopic(usr.id)

            this.fcm.onNotification().subscribe(data => {
                if (data.wasTapped) {
                    this.appSrv.message('Rx in background', 'success')
                    console.log("Received in background");
                } else {
                    this.appSrv.message('Rx in foreground', 'info')
                    console.log("Received in foreground");
                }
            })

            this.fcm.getToken().then(async token => {
                console.log('getToken: ', token)
                await this.afs.doc('users/' + usr.id).set({token:token}, {merge: true})
            })
            this.fcm.onTokenRefresh().subscribe(async token => {
                console.log('onTokenRefresh:', token)
                await this.afs.doc('users/' + usr.id).set({token:token}, {merge: true})
            })

            //this.fcm.unsubscribeFromTopic('marketing');
        }
    }
}
