import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
   {
      path: 'home',
      component: HomePage,
      children: [
         {
            path: 'pacientes',
            children: [
               {
                  path: '',
                  loadChildren: '../pacientes/pacientes.module#PacientesPageModule'
               }
            ]
         },
         {
            path: 'historia',
            children: [
               {
                  path: '',
                  loadChildren: '../historia/historia.module#HistoriaPageModule'
               }
            ]
         },
         {
            path: 'docs',
            children: [
               {
                  path: '',
                  loadChildren: '../docs/docs.module#DocsPageModule'
               }
            ]
         },
         {
            path: 'facturas',
            children: [
               {
                  path: '',
                  loadChildren: '../facturas/facturas.module#FacturasPageModule'
               }
            ]
         },
         {
            path: '',
            redirectTo: '/home/pacientes',
            pathMatch: 'full'
         }
      ]
   },
   {
      path: '',
      redirectTo: '/home/pacientes',
      pathMatch: 'full'
   }
]

@NgModule({
   imports: [
      RouterModule.forChild(routes)
   ],
   exports: [RouterModule]
})
export class HomePageRoutingModule { }
