import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// own service
import {DataService} from '../../app/data.service';
import {Phone} from '../../app/phone';

// DragulaModule
import {DragulaModule} from 'ng2-dragula';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
//  styleUrls: ['../app/dragula.css'],
  styles: [`
    .gu-mirror {
    position: fixed !important;
    margin: 0 !important;
    z-index: 9999 !important;
    opacity: 0.8;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=80)";
    filter: alpha(opacity=80);
    }
    .gu-hide {
      display: none !important;
    }
    .gu-unselectable {
      -webkit-user-select: none !important;
      -moz-user-select: none !important;
      -ms-user-select: none !important;
      user-select: none !important;
    }
    .gu-transit {
      opacity: 0.2;
      -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=20)";
      filter: alpha(opacity=20);
    }
  `],
//  directives: [DragulaModule],
//  providers: [DragulaService],
})
export class HomePage {

//  tabtitle = this.title;
  hometitle = "NG2 Title";
  items: Phone[] = [];
  items2 = [{name:"qwe"}, {name:"asd"}, {name:"zxc"}];
  items3 = [{name:"done 1"}];

  constructor(public navCtrl: NavController, 
  private dataService: DataService) {

    this.items = this.dataService.getData();
    //alert( "LOL \n home INIT ! " ); // + this.items );
  }

  initPdb() {
    console.log("clicked init");
    this.dataService.initDB();
  }

  addPdb() {
    console.log("clicked add");
    this.dataService.add("");
  }


  toggle(ind, event) {
    //alert( "array length =" + this.items.length )
    console.log( "index is: ", ind ); 
  }

  reorderItems(indexes) {
    console.log( "from=", indexes.from, " to=", indexes.to );
    let element = this.items[indexes.from];
    this.items.splice(indexes.from, 1);
    this.items.splice(indexes.to, 0, element);
    // reindex ID field in all array from start
    for( var i=0; i < this.items.length; i++ ){ this.items[i].id = i; }
  }

  reorderItems2(indexes) {
    let element = this.items2[indexes.from];
    this.items2.splice(indexes.from, 1);
    this.items2.splice(indexes.to, 0, element);
  }

  reorderItems3(indexes) {
    let element = this.items3[indexes.from];
    this.items3.splice(indexes.from, 1);
    this.items3.splice(indexes.to, 0, element);
  }

  addNew (){
    this.dataService.addData("New Task "+this.items.length, this.items.length*100);
  }
  delMe() {
    this.dataService.delLast();
  }

  onInit() {
  }


}
