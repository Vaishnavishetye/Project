import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {TrackerPage} from '../Tracker/Tracker';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  
}
goToTrackerPage(){
  this.navCtrl.push(TrackerPage);
}
}
