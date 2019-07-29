import { Component, OnInit, OnDestroy } from '@angular/core'
import { ModalController, AlertController } from '@ionic/angular'
import { AngularFirestore } from '@angular/fire/firestore'
import { Subscription } from 'rxjs'
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'
import { FbsService } from 'fwk4-authentication'
import { ApplicationService, GlobalService } from 'fwk4-services';
import { FacturaPage } from './factura.page'
import { UserModel } from 'fwk4-authentication';


@Component({
   selector: 'app-facturacion',
   templateUrl: './facturacion.page.html',
   styleUrls: ['./facturacion.page.scss'],
})
export class FacturacionPage implements OnInit, OnDestroy {
   user:UserModel
   facturasPendientes: any = []
   facturasCobradas: any = []

   totalPendientes:number
   totalCobradas:number

   criteria:string = ""
   subPend: Subscription
   subCob: Subscription
   
   constructor(
      private globalSrv:GlobalService,
      private fbsSrv: FbsService,
      private alertCtrl:AlertController,
      private iab: InAppBrowser,
      private modalController: ModalController,
      private afs: AngularFirestore,
   ) {
      console.log('FacturacionPage constructor')
   }

   filterCriteria(arr:any[], totField:string){
      const res = arr.filter(item => {
         if (!this.criteria) this.criteria = ""
         let str = JSON.stringify(item).toLowerCase()
         const idx = str.indexOf(this.criteria.toLowerCase())
         return (idx !== -1)
      })
      this[totField] = res.reduce((total, item)=> {
         return Number(total + Number(item['monto']));
      }, 0)
      return res
   }

   async ngOnInit() {
      this.user = await this.globalSrv.getItemRAM('userInfo')

      this.subPend = this.afs.collection('facturas', ref => ref.where('estado', '==', 'Pendiente').where('uid', '==', this.user.id)).valueChanges({ idField: 'id' }).subscribe(ses=>{
         this.facturasPendientes = ses 
      })
      this.subCob =  this.afs.collection('facturas', ref => ref.where('estado', '==', 'Cobrada').where('uid', '==', this.user.id)).valueChanges({ idField: 'id' }).subscribe(ses=>{
         this.facturasCobradas = ses 
      }) 
   }
   ngOnDestroy(){
      this.subPend.unsubscribe()
      this.subCob.unsubscribe()
   }
   openFile(fac){
      this.iab.create(fac.url, '_system')
   }
   changeState(fac, state){
      fac.estado = state
      this.afs.doc('facturas/'+fac.id).set(fac, { merge: true })
   }
   async deleteFactura(fac) {
      const alert = await this.alertCtrl.create({
         header: 'Confirma borrado',
         message: 'Esta seguro?',
         buttons: [
            {
               text: 'Cancel',
               role: 'cancel',
               cssClass: 'secondary',
               handler: (blah) => {
                  console.log('Delete cancelled');
               }
            }, {
               text: 'Okay',
               handler: async () => {
                  console.log('Delete confirmed')
                  await this.fbsSrv.deleteFileStorage('facturas', fac.nombre)
                  await this.afs.doc('facturas/' + fac.id).delete()
               }
            }
         ]
      })
      await alert.present()
   }
   async gotoFactura(fac) {
      const modal = await this.modalController.create({
         component: FacturaPage,
         componentProps: {
            'facturaDetail':fac
          }
      })
      return await modal.present()
   }


   private getFacturasPendientesMock() {
      const arr = [
         { id:'14343432aaa', fecha: 1563374931927, monto: 3500, obrasocial: 'OSDE', estado: 'pendiente' },
         { id:'24343432aaa', fecha: 1563374821927, monto: 9500, obrasocial: 'OSDE', estado: 'pendiente' },
         { id:'34343432aaa', fecha: 1563364531927, monto: 1100, obrasocial: 'IOMA', estado: 'pendiente' },
         { id:'44343432aaa', fecha: 1563364431927, monto: 1500, obrasocial: 'Swiss', estado: 'pendiente' },
         { id:'54343432aaa', fecha: 1563354331927, monto: 4500, obrasocial: 'Swiss', estado: 'pendiente' },
         { id:'64343432aaa', fecha: 1563344231927, monto: 6100, obrasocial: 'IOMA', estado: 'pendiente' },
         { id:'74343432aaa', fecha: 1562334131927, monto: 1500, obrasocial: 'IOMA', estado: 'pendiente' },
         { id:'84343432aaa', fecha: 1561323931927, monto: 3400, obrasocial: 'OSDE', estado: 'pendiente' },
         { id:'94343432aaa', fecha: 1560313131927, monto: 3900, obrasocial: 'OSDE', estado: 'pendiente' },
      ]
      return arr
   }
   private getFacturasCobradasMock() {
      const arr = [
         { id:'31343432aaa', fecha: 1563374831927, monto: 1100, obrasocial: 'OSDE', estado: 'cobrada' },
         { id:'32343432aaa', fecha: 1563374621927, monto: 1500, obrasocial: 'OSDE', estado: 'cobrada' },
         { id:'33343432aaa', fecha: 1563373831927, monto: 900, obrasocial: 'IOMA', estado: 'cobrada' },
         { id:'34343432aaa', fecha: 1562372831927, monto: 800, obrasocial: 'Swiss', estado: 'cobrada' },
         { id:'35343432aaa', fecha: 1560371831927, monto: 5400, obrasocial: 'Swiss', estado: 'cobrada' },
      ]
      return arr
   }
}
