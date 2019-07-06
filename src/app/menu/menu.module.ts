import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
   {
      path: '',
      component: MenuPage,
      children: [
         {
            path: 'pacientes',
            loadChildren: '../pacientes/pacientes.module#PacientesPageModule'
         },
         {
            path: 'facturacion',
            loadChildren: '../facturacion/facturacion.module#FacturacionPageModule'
         },
         {
            path: 'configuracion',
            loadChildren: '../configuracion/configuracion.module#ConfiguracionPageModule'
         },
         {
            path: 'home',
            loadChildren: '../home/home.module#HomePageModule'
         }
      ],
   },
   {
      path: '',
      redirectTo: '/menu/pacientes',
      pathMatch:'full'
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
export class MenuPageModule {
   constructor() {
      console.log('MenuPageModule constructor')
   }
}
