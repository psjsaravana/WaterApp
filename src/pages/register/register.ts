import { Component } from '@angular/core';

import { NavController,ModalController,LoadingController } from 'ionic-angular';

import { AjaxServices } from '../../services/AjaxServices';
import { MapModal } from './mapModal';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [AjaxServices]
})
export class Register {
  public userData : any;
  public locationObj : any;
  public loading : any;
  constructor(public navCtrl: NavController,public ajaxservice:AjaxServices,public modalCtrl:ModalController,public loadingController : LoadingController) {
    this.userData = {};
  }

  handleRegister() {
    let self = this;
    if(!self.userData.location) {
      alert("please add location");
      return;
    }
    self.loading = this.loadingController.create({
      content: "Please wait..."
    });
    self.loading.present();
    self.userData.address = self.userData.address1+","+self.userData.address2;
    self.ajaxservice.registerUser(this.userData).subscribe(
    data => {
      if(data.json().success == "true") {
        self.loading.dismiss();
        alert('user registered');
        self.navCtrl.pop();
      }else {
        self.loading.dismiss();
        alert('register failed');
      }
     },
     err => {
       self.loading.dismiss();
       console.log(err);
     }
   )
  }

  addLocation() {
   let self = this;
   let mapModal = this.modalCtrl.create(MapModal);
   mapModal.present();
   mapModal.onDidDismiss(data => {
     console.log(data);
     if(data && data.pos && data.pos.getPosition()) {
        self.userData.location = {lat:data.pos.getPosition().lat(),lng:data.pos.getPosition().lat()}
     }
   });
  }

  removeLocation() {
    this.userData.location = null;
  }

}


