import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { GlobalService, ApplicationService } from 'fwk4-services'
import { ModalController, NavParams, AlertController } from '@ionic/angular'
import { FbsService } from 'fwk4-authentication'
import { Chooser } from '@ionic-native/chooser/ngx'
import { UserModel, AuthService } from 'fwk4-authentication';

@Component({
   selector: 'app-user',
   templateUrl: './user.page.html',
   styleUrls: ['./user.page.scss']
})
export class UserPage implements OnInit {
   private fileInfo:any
   user: UserModel
   isMobile: boolean
   selRole: string = 'Usuario'
   isAdmin: boolean = false
   foto: any = "assets/images/anonymous.png"

   validations_form: FormGroup
   validation_messages = {
      'displayName': [
         { type: 'required', message: 'Nombre de usuario requerido' }
      ]
   }

   constructor(
      private authSrv: AuthService,
      private globalSrv: GlobalService,
      private formBuilder: FormBuilder,
      private chooser: Chooser,
      private fbsSrv: FbsService,
      private modalController: ModalController,
      private navParams: NavParams,
      private appSrv: ApplicationService
   ) {
      console.log('UserPage constructor')
   }

   async ngOnInit() {
      this.isMobile = this.globalSrv.getItemRAM('isMobile')
      this.user = this.navParams.get('user')
      this.foto = this.user.photoURL
      
      this.validations_form = this.formBuilder.group({
         displayName: new FormControl('', Validators.compose([
            Validators.required
         ]))
      })
      this.validations_form.setValue({ displayName: this.user.displayName });
   }
   chooseFileBrowser(ev) {
      this.fileInfo = ev.target.files[0]
      this.onFileSelected()
   }
   async chooseFileMobile() {
      this.fileInfo = await this.chooser.getFile('*/*')
      this.onFileSelected()
   }
   changeRole(ev) {
      this.user.isAdmin = ev.target.checked
   }
   async save(value) {
      if (this.fileInfo) {
         if (this.user.photoName)
            await this.fbsSrv.deleteFileStorage('avatars', this.user.photoName)

         const obj = await this.fbsSrv.uploadFile(this.fileInfo, 'avatars')
         this.user.photoURL = obj.url
         this.user.photoName = obj.nombre
      }

      this.user.displayName = value['displayName']
      await this.authSrv.updateUserData(this.user)
      this.modalController.dismiss()
   }
   cancel() {
      this.modalController.dismiss()
   }
   deleteUser(){
      this.appSrv.messageAlert('NO IMPLEMENTADO AUN!!', {})
   }

   private onFileSelected() {
      var reader = new FileReader()
      reader.readAsDataURL(this.fileInfo)
      reader.onload = () => {
         this.foto = reader.result;
      }
   }
}
