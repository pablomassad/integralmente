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
         title: "Facturacion",
         url: "/menu/facturacion"
      },
      {
         title: "Configuracion",
         url: "/menu/configuracion"
      }
   ]

   selectedPath = ''

   constructor(
      private router: Router
   ) { 
      this.router.events.subscribe((event:RouterEvent)=>{
         this.selectedPath = event.url
      })
   }

   ngOnInit() {
   }

}
