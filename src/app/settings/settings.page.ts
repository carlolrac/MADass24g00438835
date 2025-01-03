import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRadio, IonRadioGroup, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { MyUnitService } from '../services/my-unit.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonRadioGroup, IonRadio, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})

export class SettingsPage implements OnInit {

  unit:String = "metric";
  selUnit:String = "";

  constructor(private mus:MyUnitService) { }

  ngOnInit() {
    this.getUnit();
  }

  async getUnit() {
    this.unit = "metric";
    try {
      this.unit = await this.mus.get("unit");
      //console.log(this.unit);
    } catch (error) {
      console.log(error);
    }

    if (this.unit === null) {
      this.selUnit = "metric";
      this.mus.set("unit","metric");
    } else {
      this.selUnit = this.unit;
    }
  }

  async setUnit(selUnit:String) {
    this.mus.set("unit",selUnit);
  }

}
