import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'fwk4-services';
import { Router } from '@angular/router'
import * as moment from 'moment'

@Component({
   selector: 'app-pacientes',
   templateUrl: './pacientes.page.html',
   styleUrls: ['./pacientes.page.scss'],
})
export class PacientesPage implements OnInit {

   userPhoto: any

   patients: any = []

   constructor(
      private router:Router,
      private globalSrv: GlobalService
   ) {
      console.log('PacientesPage constructor')
      this.userPhoto = "assets/users/pato.jpg" //"assets/images/anonymous.png"
   }

   ngOnInit() {
      this.patients = this.getPatientsByProfessional(1)
   }

   async gotoDetail(p){
      await this.globalSrv.setItem('curPatient', p)
      this.router.navigate(["/home"])
   }
   private getPatientsByProfessional(id) {
      const arr = [
         {
            nombres: 'Miguel Nicolas',
            apellido: 'Aguirre',
            edad: moment().diff(moment(1562096997361, 'y')),
            nacimiento: 1562096997361,
            domicilio: "Guido 188",
            ciudad: "Acevedo, Pergamino",
            colegio: "Santa Julia",
            curso:"4to grado",
            atencion:"lunes y jueves 17 a 17:45hs",
            obrasocial:"OSDE",
            afiliado:"124555543434",
            padre:"Pedro Luis Cevallos",
            telpadre: "02477506444",
            madre:"Natalia Sara Gutierres",
            telmadre: "02477506455",
            email: "saralopez@gmail.com",
            foto:"assets/users/boy1.jpg"
         },
         {
            nombres: 'Angel Brian',
            apellido: 'Villegas',
            edad: '11',
            nacimiento: 1562056997361,
            colegio: "Normal 16",
            domicilio: "Dr.Alem 2100",
            Localidad: "Pergamino",
            email: "natyperez@hotmail.com",
            telefono: "02477503344",
            foto:"assets/users/boy2.jpg"
         },
         {
            nombres: 'Lautaro',
            apellido: 'Gomez',
            edad: '14',
            nacimiento: 1562006997361,
            colegio: "Marista",
            domicilio: "Ameguino 254 P3A",
            Localidad: "Pergamino",
            email: "oficina11@gmail.com",
            telefono: "02477511401",
            foto:"assets/users/boy3.jpg"
         },
         {
            nombres: 'Sara Luciana',
            apellido: 'Dominguez',
            edad: '7',
            nacimiento: 1562086997361,
            colegio: "Santa Julia",
            domicilio: "Posadas 334",
            Localidad: "Pergamino",
            email: "marcelagonzalez@gmail.com",
            telefono: "02477504425",
            foto:"assets/users/girl.jpg"
         },                           
      ]
      return arr
   }

}
