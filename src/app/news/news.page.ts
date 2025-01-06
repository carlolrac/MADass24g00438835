import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton, IonCardHeader, IonImg, IonCard, IonCardTitle, IonCardSubtitle, IonCardContent, IonInput } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data.service';
import { MyUnitService } from '../services/my-unit.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardSubtitle, IonCardTitle, IonCard, IonImg, IonCardHeader, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NewsPage implements OnInit {

  allNews!: any;
  isVisible:boolean = false;
  hidden:boolean = true;
  countryName!:any;
  news = [{loaded: true},{loaded: true},{loaded: true},{loaded: true},{loaded: true},{loaded: true},{loaded: true},{loaded: true},{loaded:true},{loaded: true}];
  
  
  constructor(private mus:MyUnitService, private mds: MyDataService) { }

  urlBase: String = "https://newsdata.io/api/1/news?apikey=pub_64198053d3530d485c9aa7c029dcf45e80aa8&country=";
  urlLang: String = "&language=en";
  //urlFull!: String;
  //receivedCCA2!: String;
  // cl&language=en

  ngOnInit() {

    let timeInMs = 500;
    let timeout= setTimeout( () => {
      this.getCCA2();
    }, timeInMs );
    //this.getCCA2();
    //this.getNews();
    //https://newsdata.io/api/1/news?apikey=pub_64198053d3530d485c9aa7c029dcf45e80aa8&country=cl&language=en 
  }


  async getCCA2() {
    //let recievedCCA2: String = "";
    try {
      let receivedCCA2 = await this.mus.get("country");
      console.log(receivedCCA2);
      let urlFull:any  = this.urlBase + receivedCCA2 + this.urlLang;
      console.log(urlFull);
      this.countryName = await this.mus.get("countryName");
      this.getNews(urlFull);
    } catch (error) {
      console.log(error);
    }
  }

  getNews(urlFull:any) {
    this.mds.get(urlFull).subscribe(
        {
        next: (data) => {
          //console.log(JSON.stringify(data));
          this.allNews = data.results;
        },
        error: (e) => {
          console.log(e);
          this.hidden = false;
        },
        complete: () => {
          //console.log('complete');
          //this.allNews = data.results;
        }
      }
    );
  }

  onImageError(index:number) {
    this.allNews[index].image_url = null;
  }

}
