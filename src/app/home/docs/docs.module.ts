import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DocsPage } from './docs.page';


const routes: Routes = [
  {
    path: '',
    component: DocsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers:[ ],
  declarations: [DocsPage]
})
export class DocsPageModule {

   constructor(){
      console.log('DocsPageModule constructor')
   }
}
