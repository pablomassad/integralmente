import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   { path: '', redirectTo: 'login', pathMatch: 'full' },
   //{ path: '', redirectTo: 'menu/pacientes', pathMatch: 'full' },
   { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
   { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' }
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
