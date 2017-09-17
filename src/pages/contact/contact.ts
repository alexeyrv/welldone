import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// own service
import {DataService} from '../../app/data.service';
import {Phone} from '../../app/phone';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  items: Phone[] = [];

  constructor(public navCtrl: NavController, 
  private dataService: DataService) {

    this.items = this.dataService.getData();
//    alert( "home init: " + this.items );
//    this.pp();
    this.dataService.addData("Lenovo p5", 10999);
  }

  pp (){
    this.dataService.addData("Lenovo p5", this.items.length*100);
  }

}
