import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Address, Geometry, GeoCordinates, CurrentWeather } from './../modals/common.modal';
import { CoreService } from './../core.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  /*Holds address details*/
  public addressForm: FormGroup;

  /*decides whether to display error or not*/
  public showError: boolean = false;

  /*Holds address details*/
  private formAddress: Address = {};

  /*Holds the geometry information */
  public geometry: Geometry;

  /*Holds the weather information returned from API, as we dont know the type declaring it is any*/
  public weatherDetails: any;
  public currentWeather: CurrentWeather;

  public geoCoordinates: GeoCordinates;

  /*Holds the foramtted address returned after valid address check */
  public formattedAddr: string;

  /* Decides whehter weather details needs to be displayed or not, by default it is false */
  public showWeatherInfo: boolean = false;

  /** */
  public hideWeeklyInfo: boolean = true;

  /*Holds the input paramteres that needs to be binded to weeeklyforecast component*/
  public inputParamsList: GeoCordinates;

  private subscription: Subscription;

  /*injecting core services class to the constructor */
  constructor(private coreServices: CoreService) { }

  ngOnInit() {
    //initializing reactive forms, we can use options like required, patterns but in this scenario we can enter either state or city or zip so custom validation is done.
    this.addressForm = new FormGroup({
      streetAddress: new FormControl(),
      city: new FormControl(),
      state: new FormControl(),
      zip: new FormControl()
    });

    this.showWeatherInfo = false;
    this.showError = false;

  }

  /* Method for disabling or enabling address submit button */
  public isFormEmpty() {
    let disableBtn = false;
    if (
      (this.addressForm.get("state").value == undefined || this.addressForm.get("state").value == "") &&
      (this.addressForm.get("city").value == undefined || this.addressForm.get("city").value == "") &&
      (this.addressForm.get("zip").value == undefined || this.addressForm.get("zip").value == "")
    ) {
      disableBtn = true;
    }
    return disableBtn;
  }

  /* Method for converting the timestamp*/
  public getTime(ts) {
    let date = new Date(ts * 1000),
      hrs = date.getHours(),
      mins = "0" + date.getMinutes(),
      secs = "0" + date.getSeconds();
    return hrs + ':' + mins.substr(-2) + ':' + secs.substr(-2);

  }
  /*Method for fetching the current weather forecast details from openwether API*/
  public getCurrentWeather(geo: GeoCordinates) {
    if (geo.lat && geo.lng) {
      this.coreServices.getCurrentWeather(geo).subscribe((data) => {
        this.currentWeather = data;
        console.log(this.weatherDetails);
        let ts = new Date();
        this.showWeatherInfo = true;
        this.hideWeeklyInfo = true;
        this.currentWeather.sys.sunrise = this.getTime(this.currentWeather.sys.sunrise);
        this.currentWeather.sys.sunset = this.getTime(this.currentWeather.sys.sunset);
        this.currentWeather.main.humidity = this.currentWeather.main.humidity;
        this.currentWeather.main.temp = this.currentWeather.main.temp;
        this.currentWeather.wind.speed = this.currentWeather.wind.speed;

      });

    } else {
      this.showError = true;
      this.showWeatherInfo = false;
    }
  };

  /*Method for fetching geographical coordinates for the user address from GoogleMaps API */
  public getGeoLocation() {
    /*As we used reactive forms we can check for the form validity using the form name*/
    if (this.addressForm.valid)
      this.formAddress.streetAddress = this.addressForm.get("streetAddress").value;
    this.formAddress.state = this.addressForm.get("state").value;
    this.formAddress.city = this.addressForm.get("city").value;
    this.formAddress.zip = this.addressForm.get("zip").value;

    /*Subscribing to the REST call to get location coordinates  */
    this.coreServices.getLocation(this.formAddress).subscribe((data) => {
      this.geometry = data;
      if (this.geometry.status === "OK" && this.geometry.results.length > 0) {
        this.showError = false;
        this.formattedAddr = this.geometry.results[0].formatted_address;
        this.geoCoordinates = this.geometry.results[0].geometry.location;
        this.getCurrentWeather(this.geoCoordinates);

      } else if (this.geometry.status == "ZERO_RESULTS" || this.geometry.results.length <= 0) {
        this.formattedAddr = this.formAddress.streetAddress + this.formAddress.state + this.formAddress.city + this.formAddress.zip;
        this.showError = true;
        this.showWeatherInfo = false;
      }
    });
  }
  /*Method to return the coordinates for binding to weeklyforecast component */
  public getInputParamsList() {
    return this.geoCoordinates;
  }

  public getHideWeeklyInfoFlag() {
    return this.hideWeeklyInfo;
  }

  /* Method for unsubscription - clean up*/
  public ngOnDestroy() {
    if (this.subscription && !this.subscription.closed)
      this.subscription.unsubscribe();
  }

}
