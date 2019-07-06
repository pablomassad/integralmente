import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
   selector: 'app-menu',
   templateUrl: './menu.page.html',
   styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

   pages = [
      {
         title: "Pacientes",
         url: "/menu/pacientes"
      },
      {
         title: "Facturación",
         url: "/menu/facturacion"
      },
      {
         title: "Configuración",
         url: "/menu/configuracion"
      }
   ]

   selectedPath = ''

   constructor(
      private router: Router
   ) { 
      console.log('MenuPage constructor')
      this.router.events.subscribe((event:RouterEvent)=>{
         console.log('selectedPath: ', this.selectedPath)
         if (event && (event.url != ''))
            this.selectedPath = event.url
      })
   }

   ngOnInit() {
   }

}
