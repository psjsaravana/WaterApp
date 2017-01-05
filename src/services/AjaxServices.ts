import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

declare var ape_config;
export class AjaxServices {
    
  private authentication = "https://dewdropssupply.herokuapp.com/api/login" //"http://localhost:8001/api/login";
  private register = "https://dewdropssupply.herokuapp.com/api/register" //"http://localhost:8001/api/register";

  static get parameters() {
    return [[Http]];
  }

  constructor(private http: Http) {

  }

  authenticate(data):Observable<Response> {
  	return this.http.post(this.authentication,data);
  }

  registerUser(data):Observable<Response> {
  	return this.http.post(this.register,data);
  }


 
}