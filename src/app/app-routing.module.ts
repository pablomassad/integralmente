import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   { path: '', redirectTo: 'aux', pathMatch: 'full' },
   { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
   { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
   { path: 'home', loadChildren: './home/home.module#HomePageModule' },
   { path: 'historia', loadChildren: './historia/historia.module#HistoriaPageModule' },
   { path: 'facturas', loadChildren: './facturas/facturas.module#FacturasPageModule' },
   { path: 'pacientes', loadChildren: './pacientes/pacientes.module#PacientesPageModule' },
   { path: 'aux', loadChildren: './aux/aux.module#AuxPageModule' }
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
