import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';

@Component({
  selector: 'page-Tracker',
  templateUrl: 'Tracker.html'
})
export class TrackerPage {

  constructor(public navCtrl: NavController, public locationTracker: LocationTrackerProvider) {
  
  }
  start(){
    this.locationTracker.startTracking();

  }
  stop(){
    this.locationTracker.stopTracking();
  }
  
}
