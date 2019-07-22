import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular'
import { Fwk4PipesModule } from 'fwk4-pipes'
import { OrderModule } from 'ngx-order-pipe'

import { FacturacionPage } from './facturacion.page'
import { FacturaPage } from './factura.page'
import { ToolHeadComponentModule } from '../tool-head/tool-head.module';

const routes: Routes = [
   {
      path: '',
      component: FacturacionPage
   }
];

@NgModule({
   imports: [
      ToolHeadComponentModule,
      CommonModule,
      FormsModule,
      OrderModule,
      Fwk4PipesModule,
      IonicModule,
      RouterModule.forChild(routes)
   ],
   entryComponents: [
      FacturaPage
   ],
   declarations: [FacturacionPage, FacturaPage]
})
export class FacturacionPageModule {
   constructor() {
      console.log('FacturacionPageModule constructor')
   }
}
