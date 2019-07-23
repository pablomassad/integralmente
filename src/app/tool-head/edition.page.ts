import { Component, OnInit } from '@angular/core'
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { AuthService, FirebaseService, UserModel } from 'fwk4-authentication'
import { GlobalService, ApplicationService } from 'fwk4-services'
import { ModalController, NavParams, AlertController } from '@ionic/angular'
import { AngularFirestore } from '@angular/fire/firestore'
import * as moment from 'moment'
import { FbsService } from 'src/app/fbs.service'
import { Chooser } from '@ionic-native/chooser/ngx'

@Component({
   selector: 'app-edition',
   templateUrl: './edition.page.html',
   styleUrls: ['./edition.page.scss', '../buttons.scss']
})
export class EditionPage implements OnInit {
   user: UserModel
   isMobile: boolean
   selRole:string = 'Usuario'
   isAdmin: boolean = false
   fotoUrl: string = "assets/images/anonymous.png"
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
      private appSrv: ApplicationService,
      private formBuilder: FormBuilder,
      private chooser: Chooser,
      private fbsSrv: FbsService,
      private firebaseSrv: FirebaseService,
      private modalController: ModalController
   ) {
      console.log('EditionPage constructor')
   }

   async ngOnInit() {
      this.isMobile = this.globalSrv.getItemRAM('isMobile')
      this.user = this.globalSrv.getItemRAM('userInfo')

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
            this.appSrv.hideLoading()
         })
   }
   handleAvatar(files: FileList) {
      this.savePhoto(files.item(0))
   }
   changeRole(ev){
      this.isAdmin = ev.target.checked
   }
   async save(value) {
      value['photoURL'] = this.fotoUrl
      value['isAdmin'] = this.isAdmin
      if (this.user)
         await this.firebaseSrv.updateUserData(this.user)
      this.modalController.dismiss()
   }
   cancel() {
      this.modalController.dismiss()
   }

   private savePhoto(file) {
      this.appSrv.showLoading()
      this.fbsSrv.uploadFile(file, 'avatars').then(async obj => {
         this.fotoUrl = obj.url
         this.appSrv.hideLoading()
      })
   }
}
