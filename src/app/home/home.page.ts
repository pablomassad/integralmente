import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  access(act) {
   //let flag = ((this.user.actions.indexOf(act) != -1)||(this.master==true))
   let flag = true
   return flag
}
}
