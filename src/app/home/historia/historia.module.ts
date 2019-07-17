import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { OrderModule } from 'ngx-order-pipe'

import { HistoriaPage } from './historia.page'
import { Fwk4PipesModule } from 'fwk4-pipes'
import { SesionPage } from './sesion.page';

const routes: Routes = [
   {
      path: '',
      component: HistoriaPage
   }
];

@NgModule({
   imports: [
      Fwk4PipesModule,
      CommonModule,
      FormsModule,
      IonicModule,
      OrderModule,
      RouterModule.forChild(routes)
   ],
   entryComponents:[
      SesionPage
   ],
   declarations: [HistoriaPage, SesionPage]
})
export class HistoriaPageModule {

   constructor() {
      console.log('HistoriaPageModule constructor')
   }
}
