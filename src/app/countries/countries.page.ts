import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonImg, IonCardTitle, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonButton } from '@ionic/angular/standalone';
//import { ActivatedRoute } from '@angular/router';
import { MyUnitService } from '../services/my-unit.service';
import { MyHttpServiceService } from '../services/my-http-service.service';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { HttpOptions } from '@capacitor/core';
//import { }

@Component({
  selector: 'app-countries',
  templateUrl: './countries.page.html',
  styleUrls: ['./countries.page.scss'],
  standalone: true,
  imports: [IonButton, IonCardContent, IonCardSubtitle, IonCardHeader, IonCard, IonCardTitle, IonImg, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})

export class CountriesPage implements OnInit {

  //searchKW: any = "";
  searchKW:String = "";
  returnedData!: any;
  countries!: any;

  options: HttpOptions = {
    url: 'https://restcountries.com/v3.1/name/'
  }

  constructor(private mus:MyUnitService, private mhs:MyHttpServiceService) {}

  //constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    //this.searchKW = this.activatedRoute.snapshot.paramMap.get('searchKW');
    this.getSearchKW();
    //console.log(this.searchKW);
  }

  async getSearchKW() {
    //this.sa= "metric";
    try {
      this.searchKW = await this.mus.get("searchKW");
      console.log(this.searchKW);
    } catch (error) {
      console.log(error);
    }

  this.options.url = this.options.url + this.searchKW;
  console.log(this.options.url);

    this.getCountries();

    /*
    if (this.unit === null) {
      this.selUnit = "metric";
      this.mus.set("unit","metric");
    } else {
      this.selUnit = this.unit;
    }
    */
  }

  async getCountries() {
    this.countries = await this.mhs.get(this.options);
    console.log(JSON.stringify(this.countries))
  }


}
