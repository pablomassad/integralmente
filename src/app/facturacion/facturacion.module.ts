import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular'
import { Fwk4PipesModule } from 'fwk4-pipes'
import { OrderModule } from 'ngx-order-pipe'

import { FacturacionPage } from './facturacion.page';

const routes: Routes = [
  {
    path: '',
    component: FacturacionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OrderModule,
    Fwk4PipesModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FacturacionPage]
})
export class FacturacionPageModule {
   constructor(){
      console.log('FacturacionPageModule constructor')
   }
}
