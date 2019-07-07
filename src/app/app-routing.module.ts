import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   { path: '', redirectTo: 'menu', pathMatch: 'full' },
   { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
   { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
   { path: 'ficha', loadChildren: './ficha/ficha.module#FichaPageModule' },
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
