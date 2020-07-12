import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  buttonText: 'back';
  location: any;

  constructor(public geolocation: Geolocation) { }


  submitReport(form){
    console.log(form.value);
    this.geolocation.getCurrentPosition({}).then((resp) => {
      console.log(resp.coords);
      form.latitude = resp.coords.latitude;
      form.longitude = resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });

    console.log(form.value);
  }

  ngOnInit() {
  }

}
