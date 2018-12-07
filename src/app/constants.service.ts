import { Injectable } from '@angular/core';

/**
 * This class can be injected into a component/service in our app
 */

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

     /* Holds Google Location API call URL. */
    public LOCATION_BYADDRESS_URL: string

    /* Holds Weather API call URL. */
    public WEATHER_BYLOCATION_URL: string

    /* Holds WeeklyForecast API call URL. */
    public FORECAST_BYLOCATION_URL: string

    /*open API Key */
    public OPEN_GOOGLE_API_KEY: string 

    public OPEN_WEATHER_API_KEY: string 

    /** 
     * Initializing the constants params
     * @param LOCATION_BYADDRESS_URL
     * @param WEATHER_BYLOCATION_URL
     * @param FORECAST_BYLOCATION_URL
     * @param OPEN_GOOGLE_API_KEY
     * @param OPEN_WEATHER_API_KEY
    */

  constructor() { 
    this.LOCATION_BYADDRESS_URL = "https://maps.googleapis.com/maps/api/geocode/json";
    this.WEATHER_BYLOCATION_URL = "https://api.openweathermap.org/data/2.5/weather";
    this.FORECAST_BYLOCATION_URL = "https://api.openweathermap.org/data/2.5/forecast";
    this.OPEN_GOOGLE_API_KEY = "AIzaSyAN9o32ZljOZo30sJ8_sWxerfQqfTYT2gM";
    this.OPEN_WEATHER_API_KEY = "c4bba93d2547c350e72bf5b0e84c90fa";
  }
}
