import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonImg, IonCardTitle, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonButton, IonInput } from '@ionic/angular/standalone';

import { MyUnitService } from '../services/my-unit.service';
import { MyHttpServiceService } from '../services/my-http-service.service';

import { HttpOptions } from '@capacitor/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-countries',
  templateUrl: './countries.page.html',
  styleUrls: ['./countries.page.scss'],
  standalone: true,
  imports: [IonButton, IonCardContent, IonCardSubtitle, IonCardHeader, IonCard, 
            IonCardTitle, IonImg, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, 
            IonToolbar, CommonModule, FormsModule, RouterLink]
})

export class CountriesPage implements OnInit {

  searchKW: String = "";
  returnedData!: any;
  countries!: any;
  cca2Val!: any;
  cca2s: any[] = [];
  countryNames: any[] = [];
  capitals: any[] = [];
  capitalsLatLng: any[] = [];
  hidden:boolean = true;

  options: HttpOptions = {
    url: 'https://restcountries.com/v3.1/name/'
  }

  constructor(private mus:MyUnitService, private mhs:MyHttpServiceService) {}

  ngOnInit() {
    let timeInMs = 500;
    let timeout= setTimeout( () => {
      this.getSearchKW();
    }, timeInMs );
  }

  async getSearchKW() {
    try {
      this.searchKW = await this.mus.get("searchKW");
      console.log(this.searchKW);
    } catch (error) {
      console.log(error);
    }

    this.options.url = this.options.url + this.searchKW;
    //console.log(this.options.url);

    this.getCountries();
  }

  async getCountries() {
    this.countries = await this.mhs.get(this.options);

    this.countries.forEach((country:any) => {
      console.log(country.cca2);
      this.cca2s.push(country.cca2);
      this.countryNames.push(country.name.official);
      this.capitals.push(country.capital[0]);
      this.capitalsLatLng.push(country.latlng);
    });
    //console.log(JSON.stringify(this.countries))
  }


  setCCA2(index: any) {
    this.mus.set("country", this.cca2s[index]);
    this.mus.set("countryName", this.countryNames[index]);
  }

  setCapital(index: any) {
    this.mus.set("capital", this.capitals[index]);
    this.mus.set("latlng", this.capitalsLatLng[index]);
    console.log(this.capitals[index]);
  }

}
