/// <reference types="@types/googlemaps" />
import { Component, Input, Renderer2, ElementRef, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Plugins } from '@capacitor/core';

const { Geolocation, Network } = Plugins;

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit {

  @Input() apiKey;

  public map: any;
  private mapsLoaded = false;
  private networkHandler = null;

  constructor(private renderer: Renderer2, private element: ElementRef, @Inject(DOCUMENT) private document){
  }

  ngOnInit(){

    this.init().then((res) => {
        console.log('Google Maps ready.');
    }, (err) => {
        console.log(err);
    });

}

private init(): Promise<any> {

  return new Promise((resolve, reject) => {

      this.loadSDK().then((res) => {

          // tslint:disable-next-line:no-shadowed-variable
          this.initMap().then((res) => {
              resolve(true);
          }, (err) => {
              reject(err);
          });

      }, (err) => {

          reject(err);

      });

  });

}

private loadSDK(): Promise<any> {

  console.log('Loading Google Maps SDK');

  return new Promise((resolve, reject) => {

      if (!this.mapsLoaded){

          Network.getStatus().then((status) => {

              if (status.connected){

                  this.injectSDK().then((res) => {
                      resolve(true);
                  }, (err) => {
                      reject(err);
                  });

              } else {

                  if (this.networkHandler == null){

                      // tslint:disable-next-line:no-shadowed-variable
                      this.networkHandler = Network.addListener('networkStatusChange', (status) => {

                          if (status.connected){

                              this.networkHandler.remove();

                              this.init().then((res) => {
                                  console.log('Google Maps ready.');
                              }, (err) => {
                                  console.log(err);
                              });

                          }

                      });

                  }

                  reject('Not online');
              }

          }, (err) => {

              // NOTE: navigator.onLine temporarily required until Network plugin has web implementation
              if (navigator.onLine){

                  this.injectSDK().then((res) => {
                      resolve(true);
                  // tslint:disable-next-line:no-shadowed-variable
                  }, (err) => {
                      reject(err);
                  });

              } else {
                  reject('Not online');
              }

          });

      } else {
          reject('SDK already loaded');
      }

  });


}

private injectSDK(): Promise<any> {

  return new Promise((resolve, reject) => {

      // tslint:disable-next-line:no-string-literal
      window['mapInit'] = () => {
          this.mapsLoaded = true;
          resolve(true);
      };

      // tslint:disable-next-line:prefer-const
      let script = this.renderer.createElement('script');
      script.id = 'googleMaps';

      if (this.apiKey){
          script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
      } else {
          script.src = 'https://maps.googleapis.com/maps/api/js?callback=mapInit';
      }

      this.renderer.appendChild(this.document.body, script);

  });

}

private initMap(): Promise<any> {

  return new Promise((resolve, reject) => {

      Geolocation.getCurrentPosition().then((position) => {

          console.log(position);

          // tslint:disable-next-line:prefer-const
          let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

          // tslint:disable-next-line:prefer-const
          let mapOptions = {
              center: latLng,
              zoom: 15
          };

          this.map = new google.maps.Map(this.element.nativeElement, mapOptions);
          resolve(true);

      }, (err) => {

          reject('Could not initialise map');

      });

  });

}
}
