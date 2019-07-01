import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aux',
  templateUrl: './aux.page.html',
  styleUrls: ['./aux.page.scss'],
})
export class AuxPage implements OnInit {

  constructor() { 
     console.log('AuxPage constructor')
  }

  ngOnInit() {
  }

}
