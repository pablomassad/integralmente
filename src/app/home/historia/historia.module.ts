import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HistoriaPage } from './historia.page';

const routes: Routes = [
  {
    path: '',
    component: HistoriaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HistoriaPage]
})
export class HistoriaPageModule {
   
   constructor(){
      console.log('HistoriaPageModule constructor')
   }
}
