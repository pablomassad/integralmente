import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { GlobalService, ApplicationService } from 'fwk4-services'
import { AuthService, UserModel } from 'fwk4-authentication'
import { environment } from '../../../environments/environment'

@Component({
   selector: 'app-login',
   templateUrl: './login.page.html',
   styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

   loginForm: FormGroup;
   errorMessage: string = ''

   user: UserModel = new UserModel()

   constructor(
      private globalSrv: GlobalService,
      private authSrv: AuthService,
      private route: Router
   ) { 
      console.log('LoginPage constructor')
   }

   ngOnInit() {
      // this.userSrv.getCurrentUser().then(u => {
      //    this.user = u
      //    console.log('current user: ', u)
      // })

      this.loginForm = new FormGroup({
         email: new FormControl('', Validators.required),
         password: new FormControl('', Validators.required),
      })
   }

   async tryEmailLogin() {
      this.user = await this.authSrv.doLogin(this.loginForm.value)
      this.goHome()
   }
   async tryFacebookLogin() {
      this.user = await this.authSrv.doFacebookLogin()
      this.goHome()
   }
   async tryGoogleLogin() {
      this.user = await this.authSrv.doGoogleLogin(environment.googleWebClientId)
      this.goHome()
   }
   goRegisterPage() {
      this.route.navigate(['/register'])
   }

   private goHome() {
      this.globalSrv.setItem('user', this.user)
      this.route.navigate(['/home'])
   }

}
