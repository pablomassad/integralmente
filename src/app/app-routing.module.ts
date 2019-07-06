import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   { path: '', redirectTo: 'menu', pathMatch: 'full' },
   { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
  { path: 'configuracion', loadChildren: './configuracion/configuracion.module#ConfiguracionPageModule' }
]

@NgModule({
   imports: [RouterModule.forRoot(routes)], //, { preloadingStrategy: PreloadAllModules })
   exports: [RouterModule]
})
export class AppRoutingModule {
   constructor() {
      console.log('AppRoutingModule constructor')
   }
}
