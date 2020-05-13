import {Component, OnInit} from '@angular/core'
import {GlobalService, ApplicationService} from 'fwk4-services'
import {FCM} from '@ionic-native/fcm/ngx'
// import {FCMService} from '../fcm.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    // userPhoto: any
    patient: any;
    user: any;

    constructor (
        private fcm: FCM,
        private appSrv: ApplicationService,
        private globalSrv: GlobalService
    ) {
        console.log('HomePage constructor')
        // this.userPhoto = "assets/users/pato.jpg"  //"assets/images/anonymous.png"

    }

    async ngOnInit() {
        this.user = await this.globalSrv.getItem('userInfo')

        this.patient = this.globalSrv.getItemRAM('patient')
        if (this.patient && !this.patient.foto)
            this.patient.foto = "assets/images/anonymous.png"

        const isMobile = await this.globalSrv.getItem('isMobile')
        if (isMobile) {
            this.appSrv.message('topic: '+this.user.id, 'info')
            this.fcm.subscribeToTopic(this.user.id)

            this.fcm.onNotification().subscribe(data => {
                if (data.wasTapped) {
                    this.appSrv.message('Rx in background', 'success')
                    console.log("Received in background");
                } else {
                    this.appSrv.message('Rx in foreground', 'info')
                    console.log("Received in foreground");
                }
            })

            // this.fcm.getToken().then(token => {
            //     console.log('getToken: ', token)
            //     //backend.registerToken(token);
            // })
            // this.fcm.onTokenRefresh().subscribe(token => {
            //     console.log('onTokenRefresh:', token)
            //     //backend.registerToken(token);
            // })

            //this.fcm.unsubscribeFromTopic('marketing');
        }
    }

    access(act) {
        //let flag = ((this.user.actions.indexOf(act) != -1)||(this.master==true))
        let flag = true
        return flag
    }
}



