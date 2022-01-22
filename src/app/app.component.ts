import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';


// vedere https://any-api.com/tfl_gov_uk/tfl_gov_uk/docs/API_Description


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  airQData: any;
  bikePoints: any[] = [];
  nbd : number = 0;
  npl : number = 0;
  idbp: string = "";

  constructor(private http: HttpClient) { }

  airQuality() {
    let oss: Observable<any> = this.http.get<any>(
      "https://api.tfl.gov.uk/AirQuality"
    );

    let s: Subscription = oss.subscribe(
      risp => {
        this.airQData = risp;
        console.log(risp);
      }
    );
  }

  getBikePoints() {
    let oss: Observable<any> = this.http.get<any>(
      "https://api.tfl.gov.uk/BikePoint"
    );

    let s: Subscription = oss.subscribe(
      risp => {
        this.bikePoints = risp;
        console.log(risp);
      }
    );
  }
  getBPDetails(bp: any) {
    let url = "https://api.tfl.gov.uk/BikePoint/" + bp.id;
    console.log(url);

    let osservabile: Observable<any> = this.http.get<any>(url);

    osservabile.subscribe(
      r => {
        console.log(r);
        this.nbd = r.additionalProperties[6].value;
        this.npl = r.additionalProperties[7].value;
        this.idbp = r.id;
      }
    );
  }
}
