import { Component, OnInit } from '@angular/core'
import { Router, RouterEvent } from '@angular/router'
import { GlobalService } from 'fwk4-services'
import { UserModel } from 'fwk4-authentication';

@Component({
   selector: 'app-menu',
   templateUrl: './menu.page.html',
   styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
   user:UserModel
   isMobile: boolean = false
   selectedPath = '/menu/pacientes'
   pages = [
      {
         title: "Pacientes",
         url: "/menu/pacientes"
      },
      {
         title: "Facturación",
         url: "/menu/facturacion"
      }
   ]

   constructor(
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
      const usr = await this.globalSrv.getItem('userInfo')
      if (usr.isAdmin)
         this.pages.push({
            title: "Configuración",
            url: "/menu/configuracion"
         })
   }
}
