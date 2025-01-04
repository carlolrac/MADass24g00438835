import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonImg, IonCardTitle, IonCardSubtitle, IonCardContent, IonCardHeader, IonButtons, IonBackButton } from '@ionic/angular/standalone';

import { MyUnitService } from '../services/my-unit.service';
import { MyHttpServiceService } from '../services/my-http-service.service';
import { HttpOptions } from '@capacitor/core';
//import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle, IonImg, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule ]
})

export class WeatherPage implements OnInit {

  climate!: any;
  api:String = "c618681616432ab48624042bca68eeb6";
              //c618681616432ab48624042bca68eeb6
  capital!:any;
  capitalLat!:any;
  capitalLng!:any;
  unit!:String;

  options: HttpOptions = {
    url: 'https://api.openweathermap.org/data/2.5/weather?lat=',
  }

      // LATITUDE 
    // &lon=LONGITUDE&units=UNITS&appid=YOUR_API_KEY '


  constructor(private mus:MyUnitService, private mhs:MyHttpServiceService) {}

  ngOnInit() {
    let timeInMs = 500;
    let timeout= setTimeout( () => {
      this.getCapitalData();
    }, timeInMs );
  }

  async getCapitalData() {
      try {
        this.capital = await this.mus.get("capital");
        console.log(this.capital);
        let tmpLatLng = await this.mus.get("latlng");
        console.log(tmpLatLng);
        this.capitalLat = tmpLatLng[0];
        this.capitalLng = tmpLatLng[1];
        this.unit = await this.mus.get("unit");
        console.log(this.unit);
      } catch (error) {
        console.log(error);
      }
  
      if (!this.unit) {
        this.unit = "metric";
      }

      this.options.url = this.options.url + this.capitalLat;
      this.options.url = this.options.url + "&lon=" + this.capitalLng;
      this.options.url = this.options.url + "&units=" + this.unit;
      this.options.url = this.options.url + "&appid" + this.api;
      console.log(this.options.url);
  
      this.getWeather();
  
      /*
      if (this.unit === null) {
        this.selUnit = "metric";
        this.mus.set("unit","metric");
      } else {
        this.selUnit = this.unit;
      }
      */
    }

    async getWeather() {
      this.climate = await this.mhs.get(this.options);
  
    //  this.countries.forEach((country:any) => {
    //    console.log(country.cca2);
    //    this.cca2s.push(country.cca2);
    //    this.countryNames.push(country.name.official);
    //    this.capitals.push(country.capital);
    //    this.capitalsLatLng.push(country.latlng);
    //  });
    
  
      console.log(JSON.stringify(this.climate));
    }
  }


