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
         path: 'pacientes',
         loadChildren: '../pacientes/pacientes.module#PacientesPageModule'
       },
       {
         path: 'facturacion',
         redirectTo: './facturacion/facturacion.module#FacturacionPageModule'
       },
       {
         path: 'configuracion',
         redirectTo: './configuracion/configuracion.module#ConfiguracionPageModule'
       }
     ]
   },
   {
      path:'',
      redirectTo:'menu/pacientes'
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
