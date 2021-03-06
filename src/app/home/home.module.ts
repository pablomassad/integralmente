import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'
import { IonicModule } from '@ionic/angular'

import { HomePage } from './home.page'
import { ToolHeadComponentModule } from '../tool-head/tool-head.module'

const routes: Routes = [
   {
     path: '',
     component: HomePage,
     children: [
       {
         path: 'ficha',
         loadChildren: './ficha/ficha.module#FichaPageModule'
       },
       {
         path: 'historia',
         loadChildren: './historia/historia.module#HistoriaPageModule'
       },
       {
         path: 'docs',
         loadChildren: './docs/docs.module#DocsPageModule'
       },
       {
         path: 'facturas',
         loadChildren: './facturas/facturas.module#FacturasPageModule',
       }
     ]
   },
   {
      path:'',
      redirectTo:'home/ficha',
      pathMatch:'full'
   }
 ]


@NgModule({
   imports: [
      ToolHeadComponentModule,
      CommonModule,
      FormsModule,
      IonicModule,
      RouterModule.forChild(routes)
   ],
   declarations: [HomePage]
})
export class HomePageModule { }
