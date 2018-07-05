import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListProvider } from '../../providers/providers';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  list: any;

  constructor(public navCtrl: NavController, _listP: ListProvider) {
    _listP.getList().subscribe(data => {
      /* console.log(data); */
      this.list = data;
    }, error => console.log(error));
  }

}
