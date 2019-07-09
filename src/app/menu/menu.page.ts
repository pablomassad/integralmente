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

   selectedPath = '/menu/pacientes'

   constructor(
      private router: Router
   ) { 
      console.log('MenuPage constructor')
      this.router.events.subscribe((event:RouterEvent)=>{
         if (event && event.url && (event.url != '')){
            this.selectedPath = event.url
            console.log('selectedPath: ', this.selectedPath)
         }
      })
   }

   ngOnInit() {
   }

}
