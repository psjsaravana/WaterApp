import { Component } from '@angular/core';

import { NavController,MenuController,LoadingController } from 'ionic-angular';
import { CreateOrder } from '../createOrder/createOrder';
import { Register } from '../register/register';
import { AjaxServices } from '../../services/AjaxServices';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AjaxServices]
})
export class Login {
  public loginData : any;
  public userDetails : any;
  public loading: any;
  constructor(public navCtrl: NavController,public menu:MenuController,public ajaxService:AjaxServices,public loadingController :LoadingController) {
    this.loginData = {};
  }
  ionViewDidLoad() {
    this.menu.enable(false);
  }
  doLogin() {
    let self = this;
    self.loading = this.loadingController.create({
      content: "Please wait..."
    });
    self.loading.present();
    self.ajaxService.authenticate(self.loginData).subscribe(
    data => {
      if(data.json().success == "true") {
        self.loading.dismiss();
        self.userDetails =  data.json().userDetails;
        self.navCtrl.setRoot(CreateOrder,{userDetails:self.userDetails});
        console.log('login success');        
      }else {
        self.loading.dismiss();
        alert('login failed');
      }
     },
     err => {
       self.loading.dismiss();
       console.log(err);
     }
   )
  }
  openRegister() {
    this.navCtrl.push(Register);
  }
}
