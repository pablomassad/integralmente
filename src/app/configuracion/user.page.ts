import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { GlobalService, ApplicationService } from 'fwk4-services'
import { ModalController, NavParams, AlertController } from '@ionic/angular'
import { FbsService } from 'src/app/fbs.service'
import { Chooser } from '@ionic-native/chooser/ngx'
import { UserModel, FirebaseService } from 'fwk4-authentication';

@Component({
   selector: 'app-user',
   templateUrl: './user.page.html',
   styleUrls: ['./user.page.scss', '../buttons.scss']
})
export class UserPage implements OnInit {
   user: UserModel
   isMobile: boolean
   selRole:string = 'Usuario'
   isAdmin: boolean = false
   fotoUrl: string = "assets/images/anonymous.png"
   validations_form: FormGroup
   validation_messages = {
      'displayName': [
         { type: 'required', message: 'Nombre de usuario requerido' }
      ]
   }

   constructor(
      private globalSrv: GlobalService,
      private appSrv: ApplicationService,
      private formBuilder: FormBuilder,
      private chooser: Chooser,
      private fbsSrv: FbsService,
      private firebaseSrv: FirebaseService,
      private modalController: ModalController,
      private navParams: NavParams
   ) {
      console.log('UserPage constructor')
   }

   async ngOnInit() {
      this.isMobile = this.globalSrv.getItemRAM('isMobile')
      this.user = this.navParams.get('user')

      this.validations_form = this.formBuilder.group({
         displayName: new FormControl('', Validators.compose([
            Validators.required
         ]))
      })
      this.validations_form.setValue({ displayName: this.user.displayName });
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
      this.user.isAdmin = ev.target.checked
   }
   async save(value) {
      this.user.displayName = value['displayName']
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
