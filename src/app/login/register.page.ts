import { Component, OnInit } from '@angular/core'
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { AuthService, UserModel } from 'fwk4-authentication'
import { GlobalService } from 'fwk4-services'
import { ModalController, NavParams, AlertController } from '@ionic/angular'
import { AngularFirestore } from '@angular/fire/firestore'
import * as moment from 'moment'
import { FbsService } from 'src/app/fbs.service'
import { Chooser } from '@ionic-native/chooser/ngx'

@Component({
   selector: 'app-register',
   templateUrl: './register.page.html',
   styleUrls: ['./register.page.scss', '../buttons.scss']
})
export class RegisterPage implements OnInit {
   isMobile: boolean
   user: UserModel
   fotoUrl:string = "assets/images/anonymous.png"
   validations_form: FormGroup
   validation_messages = {
      'displayName': [
         { type: 'required', message: 'Nombre de usuario requerido' }
      ],
      'email': [
         { type: 'required', message: 'Email requerido' },
         { type: 'pattern', message: 'Ingrese un email válido' }
      ],
      'password': [
         { type: 'required', message: 'Password requerido' },
         { type: 'minlength', message: 'Password debe tener un min. de 5 caracteres' }
      ]
   }

   constructor(
      private globalSrv: GlobalService,
      private formBuilder: FormBuilder,
      private chooser: Chooser,
      private fbsSrv: FbsService,
      private afs: AngularFirestore,
      private modalController: ModalController,
      private alertCtrl: AlertController,
      private authService: AuthService,
   ) {
      console.log('RegisterPage constructor')
   }

   ngOnInit() {
      this.isMobile = this.globalSrv.getItemRAM('isMobile')

      this.validations_form = this.formBuilder.group({
         displayName: new FormControl('', Validators.compose([
            Validators.required
         ])),
         email: new FormControl('', Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
         ])),
         password: new FormControl('', Validators.compose([
            Validators.minLength(5),
            Validators.required
         ])),
      })
   }

   chooseFile() {
      this.chooser.getFile('*/*').then(foto => {
         if (foto) this.savePhoto(foto)
      })
         .catch(err => {
            this.fbsSrv.stopSpinner()
         })
   }
   handleAvatar(files: FileList) {
      this.savePhoto(files.item(0))
   }
   tryRegister(value) {
      value['photoURL'] = this.fotoUrl 
      this.authService.doRegister(value)
         .then(res => {
            console.log('UserModel: ', res)
         }, err => {
            console.log('Error registration: ', err)
         })
   }
   cancel() {
      this.modalController.dismiss()
   }

   private savePhoto(file) {
      this.fbsSrv.startSpinner()
      this.fbsSrv.uploadFile(file, 'avatars').then(async obj => {
         this.fotoUrl = obj.url
         this.fbsSrv.stopSpinner()
         this.modalController.dismiss()
      })
   }
}
