import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Login } from '../pages/login/login';
import { Register } from '../pages/register/register';
import { Profile } from '../pages/profile/profile';
import { TrackOrder } from '../pages/trackOrder/trackOrder';
import { CreateOrder } from '../pages/createOrder/createOrder';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Login;

  pages: Array<{title: string, component: any,icon : any}>;

  constructor(public platform: Platform) {
    this.initializeApp();
    this.pages = [
      { title: 'Place Order', component: CreateOrder, icon : 'cart' },
      { title: 'Order Status', component: TrackOrder, icon : 'timer' },
      { title: 'Profile', component: Profile, icon : 'contact' },
      { title: 'Logout', component: Login, icon : 'log-out' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
