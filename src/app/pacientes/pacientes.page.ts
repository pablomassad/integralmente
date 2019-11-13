import {Component, OnInit, OnDestroy} from '@angular/core'
import {GlobalService, ApplicationService} from 'fwk4-services'
import {Router} from '@angular/router'
import * as moment from 'moment'
import {AngularFirestore} from '@angular/fire/firestore'
import {Subscription} from 'rxjs'


@Component({
    selector: 'app-pacientes',
    templateUrl: './pacientes.page.html',
    styleUrls: ['./pacientes.page.scss']
})
export class PacientesPage implements OnInit, OnDestroy {
    private sub: Subscription
    criteria: string
    patients: any = []

    constructor (
        private appSrv: ApplicationService,
        private route: Router,
        private afs: AngularFirestore,
        private globalSrv: GlobalService
    ) {
        console.log('PacientesPage constructor')
    }

    async ngOnInit() {
        try {
            let usr = await this.globalSrv.getItem('userInfo')

            await this.appSrv.loading(true)
            this.sub = this.afs.collection('pacientes', ref => ref.where('uid', '==', usr.id)).valueChanges({idField: 'id'}).subscribe(async ps => {
                this.patients = ps
                await this.appSrv.loading(false)
            })
        } catch (error) {
            console.log('Error Pacientes: ', error)
            await this.appSrv.loading(false)
        }
    }
    ngOnDestroy() {
        this.sub.unsubscribe()
    }
    async removePatient(p) {
        // Borrar la foto del paciente
        // Borrar los adjuntos
        await this.afs.collection('pacientes').doc(p.id).delete()
    }
    async gotoPatient(p) {
        await this.globalSrv.setItem('patient', p)
        this.route.navigate(["/menu/home/ficha"])
    }
    evalEdad(nac) {
        const today = moment()
        const cumple = moment(nac)
        const edad = today.diff(cumple, 'y')
        return edad + " años"
    }
}
