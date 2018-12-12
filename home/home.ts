import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import {TrackerPage} from '../Tracker/Tracker';
import { FormBuilder, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  credentialsForm: FormGroup;

constructor(public navCtrl: NavController,private formBuilder: FormBuilder,public http : Http) {
  this.credentialsForm = this.formBuilder.group({
    username: [''],
    password: ['']
  });
}

ionViewDidLoad(){
  let headers = new Headers;
  headers.append('Content-type', 'application/json');
 
  let body = {
    username: this.credentialsForm.username,
    passsword: this.credentialsForm.password
  };

  this.http.post('http://localhost:8008/api/test',JSON.stringify(body),{headers: headers})
  .map(res => res.json())
  .subscribe(data =>{
    console.log(data);
  });
}

goToTrackerPage(){
   this.navCtrl.push(TrackerPage);
}
}
