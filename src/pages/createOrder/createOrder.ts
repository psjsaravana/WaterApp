import { Component } from '@angular/core';

import { NavController,MenuController,NavParams } from 'ionic-angular';

@Component({
  selector: 'page-create-order',
  templateUrl: 'create-order.html'
})
export class CreateOrder {
  public userDetails : any ;
  constructor(private navParams: NavParams,public navCtrl: NavController,public menu:MenuController) {
    this.userDetails = navParams.get('userDetails');
  }

  ionViewDidLoad() {
    this.menu.enable(true);
  }

}
