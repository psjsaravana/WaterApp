import { Component,ViewChild,ElementRef } from '@angular/core';

import { NavParams,NavController,ViewController } from 'ionic-angular';
import {Geolocation} from 'ionic-native';
declare var google,mapLoaded;


@Component({
  selector: 'page-map-modal',
  templateUrl: 'map-modal.html'
})
export class MapModal {

@ViewChild('map') mapElement: ElementRef;

public map : any;
public mapMarker : any;
public locMarker : any;
 constructor(params: NavParams,public navCtrl: NavController,public viewCtrl: ViewController) {
   console.log('MapModal init');   
 }
 
 ionViewDidLoad() {
     if(mapLoaded) {
       this.loadMap();
     }else {
       alert('error loading map,try again after some time');
     }
     
 }

 closeModal() {
   this.viewCtrl.dismiss();
 }

 selectLocation() {
   this.viewCtrl.dismiss({pos:this.mapMarker});
 }

 loadMap() {
   let self = this;
   let bellandurLat = '12.92597558331547';
   let bellandurLng = '77.67608642578125';
   var latLng = new google.maps.LatLng(bellandurLat, bellandurLng);
   let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
   self.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
   self.mapMarker = new google.maps.Marker({map: this.map});
   self.locMarker = new google.maps.Marker({map: this.map,animation: google.maps.Animation.DROP});
   self.addYourLocationButton(self.map, self.locMarker);
   google.maps.event.addListener(this.map, "click", function (e) {
            console.log(e.latLng);
            self.mapMarker.setPosition(e.latLng);
        });
  self.loadCurrentLocation();
   
 }

 loadCurrentLocation() { 
   var self =this;
   Geolocation.getCurrentPosition().then((position) => {   
      var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
      self.mapMarker.setPosition(pos);
    }, (err) => {
      console.log(err);
    }); 
 }

 addYourLocationButton(map, marker) {
   var self = this;
    var controlDiv = document.createElement('div');

    var firstChild = document.createElement('button');
    firstChild.style.backgroundColor = '#fff';
    firstChild.style.border = 'none';
    firstChild.style.outline = 'none';
    firstChild.style.width = '28px';
    firstChild.style.height = '28px';
    firstChild.style.borderRadius = '2px';
    firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
    firstChild.style.cursor = 'pointer';
    firstChild.style.marginRight = '10px';
    firstChild.style.padding = '0px';
    firstChild.title = 'Your Location';
    controlDiv.appendChild(firstChild);

    var secondChild = document.createElement('div');
    secondChild.style.margin = '5px';
    secondChild.style.width = '18px';
    secondChild.style.height = '18px';
    secondChild.style.backgroundImage = 'url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-1x.png)';
    secondChild.style.backgroundSize = '180px 18px';
    secondChild.style.backgroundPosition = '0px 0px';
    secondChild.style.backgroundRepeat = 'no-repeat';
    secondChild.id = 'you_location_img';
    firstChild.appendChild(secondChild);

    google.maps.event.addListener(map, 'dragend', function() {
        //$('#you_location_img').css('background-position', '0px 0px');
    });

    firstChild.addEventListener('click', function() {
        self.loadCurrentLocation();
    });

    controlDiv['index'] = 1;
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
 }

 

}