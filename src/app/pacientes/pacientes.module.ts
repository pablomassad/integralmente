import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'

import { IonicModule } from '@ionic/angular'
import { OrderModule } from 'ngx-order-pipe'
import { PacientesPage } from './pacientes.page'
import { Fwk4PipesModule } from 'fwk4-pipes'
import { ToolHeadComponentModule } from '../tool-head/tool-head.module';

const routes: Routes = [
   {
      path: '',
      component: PacientesPage
   }
];

@NgModule({
   imports: [
      ToolHeadComponentModule,
      Fwk4PipesModule,
      CommonModule,
      OrderModule,
      FormsModule,
      IonicModule,
      RouterModule.forChild(routes)
   ],
   declarations: [PacientesPage]
})
export class PacientesPageModule {
   constructor() {
      console.log('PacientesPageModule constructor')
   }
}
