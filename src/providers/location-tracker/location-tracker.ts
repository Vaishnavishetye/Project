//import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import { NavController, GESTURE_GO_BACK_SWIPE } from 'ionic-angular';
import {HomePage} from '../../pages/home/home';
import { AlertController } from 'ionic-angular'

/*
  Generated class for the LocationTrackerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationTrackerProvider {
  [x: string]: any;
/*
  constructor(public http: HttpClient) {
    console.log('Hello LocationTrackerProvider Provider');
  }*/

  public watch: any;   
  public lat: number = 0;
  public lng: number = 0;

  constructor(public zone: NgZone, private geolocation: Geolocation, private backgroundGeolocation: BackgroundGeolocation, private alertCtrl: AlertController) {
 
  }

 
  startTracking() {
         // Background Tracking
 
  let config = {
    desiredAccuracy: 0,
    stationaryRadius: 20,
    distanceFilter: 10,
    debug: true,
    interval: 2000
  };
 
  this.backgroundGeolocation.configure(config).subscribe((location) => {
 
    console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
 
    // Run update inside of Angular's zone
    this.zone.run(() => {
      this.lat = location.latitude;
      this.lng = location.longitude;
    });
 
  }, (err) => {
 
    console.log(err);
 
  });
 
  // Turn ON the background-geolocation system.
  this.backgroundGeolocation.start();
 
 
  // Foreground Tracking
 
let options = {
  frequency: 3000,
  enableHighAccuracy: true
};
 
this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
 
  console.log(position);
 
  // Run update inside of Angular's zone
  this.zone.run(() => {
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;
  });
 
});
 
  }
 
  stopTracking() {

    console.log('stopTracking'); 
    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();

      let alert = this.alertCtrl.create({
        title: 'Tracking Disabled',
        buttons : ['Dismiss']
        //buttons : ['Yes', 'No'],
      });
      alert.present();
    //this.lat = 0;
    //this.lng = 0;
  }
 
}
