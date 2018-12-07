import { Component, OnInit, Input } from '@angular/core';
import { GeoCordinates, ForecastWeather } from '../modals/common.modal';

import { CoreService } from './../core.service';
import { Subscription } from 'rxjs';

/** WeeklyWeatherForecast Component metadata */
@Component({
  selector: 'app-Weeklyforecast',
  templateUrl: './weeklyforecast.component.html',
  styleUrls: ['./weeklyforecast.component.css']
})

/*Builds weekly forecast*/
export class WeeklyforecastComponent implements OnInit {
  /*Retreving the binded value from address component class using @Input decorator*/
  @Input()
  paramsList: GeoCordinates;

  @Input()
  hideWeeklyInfo: boolean;

  /* Holds weather details */
  public showWeeklyForecast: boolean;
  public forecastDetails: ForecastWeather;
  public forecastList: any;

  private showError: boolean = false;
  private subscription: Subscription;

  /** Calling the core open weather services and retrieving the response. 
  * @param coreServices
  */
  constructor(
    private coreServices: CoreService
  ) {
    this.showWeeklyForecast = false;
    this.hideWeeklyInfo = this.hideWeeklyInfo;
  }

  ngOnInit() {

  }
  /** Method to retrive weather forecast details and display */
  public displayWeeklyForecast(params) {
    this.showWeeklyForecast = true;
    this.hideWeeklyInfo = false;
    if (params.lat && params.lng) {
      this.coreServices.getWeeklyWeather(params).subscribe((data) => {
        console.log(data);
        this.forecastDetails = data;
        this.forecastList = this.forecastDetails.list;
      });
    } else {
      this.showError = true;
      this.showWeeklyForecast = false;
    }


  }

  /* Method for unsubscription - clean up*/
  public ngOnDestroy() {
    if (this.subscription && !this.subscription.closed)
      this.subscription.unsubscribe();
  }

}
