import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular'
import { Fwk4PipesModule } from 'fwk4-pipes'
import { OrderModule } from 'ngx-order-pipe'
import { ConfiguracionPage } from './configuracion.page'
import { ToolHeadComponentModule } from '../tool-head/tool-head.module'

const routes: Routes = [
   {
      path: '',
      component: ConfiguracionPage
   }
];

@NgModule({
   imports: [
      OrderModule,
      Fwk4PipesModule,
      ToolHeadComponentModule,
      CommonModule,
      FormsModule,
      IonicModule,
      RouterModule.forChild(routes)
   ],
   declarations: [ConfiguracionPage]
})
export class ConfiguracionPageModule {
   constructor() {
      console.log('ConfiguracionPageModule constructor')
   }
}
