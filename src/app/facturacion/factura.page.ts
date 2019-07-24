import { Component, OnInit, OnDestroy } from '@angular/core'
import { GlobalService, ApplicationService } from 'fwk4-services'
import { ModalController, NavParams, AlertController } from '@ionic/angular'

import { AngularFirestore } from '@angular/fire/firestore'
import * as moment from 'moment'
import { FbsService } from 'src/app/fbs.service'
import { Chooser } from '@ionic-native/chooser/ngx'
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'
import { UserModel } from 'fwk4-authentication';


@Component({
   selector: 'app-factura',
   templateUrl: './factura.page.html',
   styleUrls: ['./factura.page.scss', '../buttons.scss'],
})
export class FacturaPage implements OnInit, OnDestroy {
   private fileInfo:any
   user:UserModel
   factura: any
   isMobile: boolean
   fechaFactura:any

   constructor(
      private iab: InAppBrowser,
      private chooser: Chooser,
      private alertCtrl: AlertController,
      private navParams: NavParams,
      private modalController: ModalController,
      private globalSrv: GlobalService,
      private appSrv: ApplicationService,
      private afs: AngularFirestore,
      private fbsSrv: FbsService
   ) {
      console.log('FacturaPage constructor')
   }

   ngOnInit() {
      this.isMobile = this.globalSrv.getItemRAM('isMobile')
      this.user = this.globalSrv.getItemRAM('userInfo')
      this.factura = this.navParams.get('facturaDetail')
      this.fechaFactura = moment(this.factura.fecha).format("MM/DD/YYYY")
      if (!this.factura['id']){
         this.factura.estado = "Pendiente"
      }
   }
   ngOnDestroy() {
   }
   changeState(ev){
      this.factura.estado = (ev.target.checked == true)?'Cobrada':'Pendiente'
   }

   chooseFileBrowser(info: File) {
      this.fileInfo = info
   }
   async chooseFileMobile() {
      this.fileInfo = await this.chooser.getFile('*/*')
   }

   openFile(url) {
      this.iab.create(url, '_system')
   }
   onObsChanged(ev) {
      this.factura.observaciones = ev.target.value
   }

   async save() {
      if (this.fileInfo) {
         if (this.factura.nombre)
            await this.fbsSrv.deleteFileStorage('facturas', this.factura.nombre)

         const obj = await this.fbsSrv.uploadFile(this.fileInfo, 'facturas')
         this.factura.url = obj.url
         this.factura.nombre = obj.nombre
      }

      this.factura.fecha = moment(this.fechaFactura).valueOf()
      this.factura.uid = this.user.id

      if (this.factura['id'] != undefined)
         await this.afs.doc('facturas/'+this.factura.id).set(this.factura, { merge: true })
      else
         await this.afs.collection('facturas').add(this.factura)

      
      // else{
      //    const alert = await this.alertCtrl.create({
      //       header: 'Alerta',
      //       subHeader: 'No esta la factura',
      //       message: 'Debe cargar una factura para grabar',
      //       buttons: ['OK']
      //     })
      //     await alert.present()
      // }

      this.modalController.dismiss()
   }
   cancel() {
      this.modalController.dismiss()
   }
}
