import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';
//import { ActivatedRoute } from '@angular/router';
import { MyUnitService } from '../services/my-unit.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.page.html',
  styleUrls: ['./countries.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CountriesPage implements OnInit {

  //searchKW: any = "";
  searchKW:String = "";

  constructor(private mus:MyUnitService) {}

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

    /*
    if (this.unit === null) {
      this.selUnit = "metric";
      this.mus.set("unit","metric");
    } else {
      this.selUnit = this.unit;
    }
    */
  }


}
