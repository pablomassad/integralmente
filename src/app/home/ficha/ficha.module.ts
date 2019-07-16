import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular';

import { FichaPage } from './ficha.page';

const routes: Routes = [
   {
      path: '',
      component: FichaPage
   }
];

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      IonicModule,
      RouterModule.forChild(routes)
   ],
   declarations: [FichaPage]
})
export class FichaPageModule {
   constructor() {
      console.log('FichaPageModule constructor')
   }
}
