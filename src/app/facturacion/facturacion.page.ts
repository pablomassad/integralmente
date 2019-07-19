import { Component, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { AngularFirestore } from '@angular/fire/firestore'
import { FacturaPage } from './factura.page'

@Component({
   selector: 'app-facturacion',
   templateUrl: './facturacion.page.html',
   styleUrls: ['./facturacion.page.scss', '../buttons.scss'],
})
export class FacturacionPage implements OnInit {
   facturasPendientes: any = []
   facturasCobradas: any = []

   totalPendientes:number = 0
   totalCobradas:number = 0

   criteria:string = "OSDE"
   
   constructor(
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
         return total + item['monto'];
      },0)
      return res
   }

   ngOnInit() {
      this.facturasPendientes = this.getFacturasPendientesMock()
      this.facturasCobradas = this.getFacturasCobradasMock()

      // this.afs.collection('facturas').ref.where('estado' == 'pendientes').valueChanges({ idField: 'id' }).subscribe(ses=>{
      //    this.facturasPendientes = ses 
      // })

      // this.afs.collection('facturas').ref.where('estado' == 'cobradas').valueChanges({ idField: 'id' }).subscribe(ses=>{
      //    this.facturasCobradas = ses 
      // }) 
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
         { fecha: 1563374931927, monto: 3500, obrasocial: 'OSDE', estado: 'pendiente' },
         { fecha: 1563374921927, monto: 9500, obrasocial: 'OSDE', estado: 'pendiente' },
         { fecha: 1563374531927, monto: 1100, obrasocial: 'IOMA', estado: 'pendiente' },
         { fecha: 1563374431927, monto: 1500, obrasocial: 'Swiss', estado: 'pendiente' },
         { fecha: 1563374331927, monto: 4500, obrasocial: 'Swiss', estado: 'pendiente' },
         { fecha: 1563374231927, monto: 6100, obrasocial: 'IOMA', estado: 'pendiente' },
         { fecha: 1563374131927, monto: 1500, obrasocial: 'IOMA', estado: 'pendiente' },
         { fecha: 1563373931927, monto: 3400, obrasocial: 'OSDE', estado: 'pendiente' },
         { fecha: 1563373131927, monto: 3900, obrasocial: 'OSDE', estado: 'pendiente' },
      ]
      return arr
   }
   private getFacturasCobradasMock() {
      const arr = [
         { fecha: 1563374931927, monto: 1100, obrasocial: 'OSDE', estado: 'cobrada' },
         { fecha: 1563374921927, monto: 1500, obrasocial: 'OSDE', estado: 'cobrada' },
         { fecha: 1563374831927, monto: 900, obrasocial: 'IOMA', estado: 'cobrada' },
         { fecha: 1563374831927, monto: 800, obrasocial: 'Swiss', estado: 'cobrada' },
         { fecha: 1563374831927, monto: 5400, obrasocial: 'Swiss', estado: 'cobrada' },
      ]
      return arr
   }
}
