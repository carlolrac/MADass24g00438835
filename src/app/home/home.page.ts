import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonInput, IonItem } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { settingsOutline } from 'ionicons/icons';
import { search } from 'ionicons/icons';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MyUnitService } from '../services/my-unit.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonInput, IonItem, RouterLink, FormsModule],
})

export class HomePage {

  searchKW:String = "";

  constructor(private mus:MyUnitService) { addIcons({settingsOutline, search}); }

  async setSearchKW(searchKW:String) {
    this.mus.set("searchKW",searchKW);
  }

}
