import {Component, OnInit} from '@angular/core'
import {Router, RouterEvent} from '@angular/router'
import {GlobalService, ApplicationService} from 'fwk4-services'

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
    }
}
