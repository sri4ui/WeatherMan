import { Injectable } from '@angular/core';
import { Address, GeoCordinates } from '././modals/common.modal';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from './constants.service';

/**
 * This class can be injected into a component/service in our app
 */
@Injectable({
  providedIn: 'root'
})
export class CoreService {
   /**
     * Constructor.
     * @param httpClient
     * @param constants 
     */
  constructor(
    private httpClient: HttpClient,
    private constants: ConstantsService
    ) {   }

/** Returns the location by taking address as input  */
 public getLocation (requestAddress : Address) {
       /*Constructing the google maps API with address as request headers*/
      let city, state, zip ,streetaddress, URL, addrRequest;
      streetaddress = requestAddress.streetAddress != undefined ? requestAddress.streetAddress: "";
      city = requestAddress.city != undefined ? requestAddress.city : "" ;
      state = requestAddress.state != undefined ? requestAddress.state : "";
      zip = requestAddress.zip != undefined ? requestAddress.zip : "";
      addrRequest = streetaddress + ','  + city + ',' + state  + ',' + zip ;
      URL = this.constants.LOCATION_BYADDRESS_URL + "?address=" + addrRequest + "&key=" + this.constants.OPEN_GOOGLE_API_KEY;

      return this.httpClient.get(URL);

    }
/** Returns current weather by taking locationn coordiantes as input */
  public getCurrentWeather(geo : GeoCordinates) {
    let lat : string , lon : string;
    lat = geo.lat; lon = geo.lng;
    let weatherLocAPI = this.constants.WEATHER_BYLOCATION_URL+ "?lat=" +  lat + "&lon=" +  lon + "&appid=" + this.constants.OPEN_WEATHER_API_KEY;
				return this.httpClient.get(weatherLocAPI);
  }

  /** Returns the weekly forecast by taking location coordinates as input */
  public getWeeklyWeather(geo : GeoCordinates){
    let lat : string , lon : string;
    lat = geo.lat; lon = geo.lng;
    let weatherLocAPI = this.constants.FORECAST_BYLOCATION_URL + "?lat=" +  lat + "&lon=" +  lon + "&appid=" + this.constants.OPEN_WEATHER_API_KEY;
				return this.httpClient.get(weatherLocAPI);
  }
  };
