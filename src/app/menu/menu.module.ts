import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
   {
     path: 'menu',
     component: MenuPage,
     children: [
       {
         path: 'ficha',
         loadChildren: '../ficha/ficha.module#FichaPageModule'
       },
       {
         path: 'historia',
         redirectTo: '../historia/historia.module#HistoriaPageModule'
       },
       {
         path: 'docs',
         redirectTo: '../docs/docs.module#DocsPageModule'
       },
       {
         path: 'facturas',
         redirectTo: '../home/facturas/facturas.module#FacturasPageModule',
       }
     ]
   },
   {
      path:'',
      redirectTo:'menu/ficha'
   }
 ]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
