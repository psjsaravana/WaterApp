import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Login } from '../pages/login/login';
import { Register } from '../pages/register/register';
import { MapModal } from '../pages/register/mapModal';
import { Profile } from '../pages/profile/profile';
import { TrackOrder } from '../pages/trackOrder/trackOrder';
import { CreateOrder } from '../pages/createOrder/createOrder';

@NgModule({
  declarations: [
    MyApp,
    Login,
    Register,
    Profile,
    TrackOrder,
    CreateOrder,
    MapModal
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    Register,
    Profile,
    TrackOrder,
    CreateOrder,
    MapModal
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
