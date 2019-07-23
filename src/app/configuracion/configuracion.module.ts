import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'

import { IonicModule } from '@ionic/angular'
import { Fwk4PipesModule } from 'fwk4-pipes'
import { OrderModule } from 'ngx-order-pipe'

import { ConfiguracionPage } from './configuracion.page'
import { UserPage } from './user.page'
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
      ReactiveFormsModule,
      IonicModule,
      RouterModule.forChild(routes)
   ],
   entryComponents: [
      UserPage
   ],
   declarations: [ConfiguracionPage, UserPage]
})
export class ConfiguracionPageModule {
   constructor() {
      console.log('ConfiguracionPageModule constructor')
   }
}
