import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'

import { IonicModule } from '@ionic/angular'

import { PacientesPage } from './pacientes.page'
import { Fwk4PipesModule } from 'fwk4-pipes'

const routes: Routes = [
   {
      path: '',
      component: PacientesPage
   }
];

@NgModule({
   imports: [
      Fwk4PipesModule,
      CommonModule,
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
