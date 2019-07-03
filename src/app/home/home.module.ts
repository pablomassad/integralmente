import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'
import { IonicModule } from '@ionic/angular'

import { HomePage } from './home.page';

const routes: Routes = [
   {
     path: 'home',
     component: HomePage,
     children: [
       {
         path: 'ficha',
         loadChildren: './ficha/ficha.module#FichaPageModule'
       },
       {
         path: 'historia',
         redirectTo: './historia/historia.module#HistoriaPageModule'
       },
       {
         path: 'docs',
         redirectTo: './docs/docs.module#DocsPageModule'
       },
       {
         path: 'facturas',
         redirectTo: './home/facturas/facturas.module#FacturasPageModule',
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
      CommonModule,
      FormsModule,
      IonicModule,
      RouterModule.forChild(routes)
   ],
   declarations: [HomePage]
})
export class HomePageModule { }
