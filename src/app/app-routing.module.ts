import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   { path: '', redirectTo: 'pacientes', pathMatch: 'full' },
   { path: 'pacientes', loadChildren: './pacientes/pacientes.module#PacientesPageModule' },
   { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
   { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
   { path: 'home', loadChildren: './home/home.module#HomePageModule' },
   { path: 'facturacion', loadChildren: './facturacion/facturacion.module#FacturacionPageModule' },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
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
