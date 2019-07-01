import { Component, OnInit } from '@angular/core'
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { UserModel, AuthService } from 'fwk4-authentication'
import { Router } from '@angular/router'
import { GlobalService, ApplicationService } from 'fwk4-services'


@Component({
   selector: 'app-login',
   templateUrl: './login.page.html',
   styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

   loginForm: FormGroup

   validations_form: FormGroup
   errorMessage: string = ''

   validation_messages = {
      'email': [
         { type: 'required', message: 'Email is required.' },
         { type: 'pattern', message: 'Please enter a valid email.' }
      ],
      'password': [
         { type: 'required', message: 'Password is required.' },
         { type: 'minlength', message: 'Password must be at least 5 characters long.' }
      ]
   }

   user: UserModel = new UserModel()

   constructor(
      private authSrv: AuthService,
      private route: Router,
      private formBuilder: FormBuilder,
      private globalSrv: GlobalService
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

      this.validations_form = this.formBuilder.group({
         email: new FormControl('', Validators.compose([
           Validators.required,
           Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
         ])),
         password: new FormControl('', Validators.compose([
           Validators.minLength(5),
           Validators.required
         ])),
       });
   }

   async tryEmailLogin(value) {
      this.user = await this.authSrv.doLogin(value)
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
