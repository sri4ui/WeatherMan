# Weather Man - This App provides weather information based on user entered address. 

# How this App  works :

User can enter any  one value State, City , Zip and can check the current weather at that location. On click of future forecast next 1 week weather information will be available for the user.

Based on the city, state, Zip entered we get the geolocation of the USER using google maps API and then call two different openweather API's for current and future forecast. 

![](src/assets/addressForm.PNG)
![](src/assets/currentForecast.PNG)
![](src/assets/FutureForecast.PNG)
![](src/assets/TestRun.PNG)

# Stack :  
Angular 6.1.0 , Angular-CLI 6.1.2, Karma 1.7.1 , Jasmine 2.5.45 , NPM

## Development server
ng serve -o, will open the http://localhost:4200/ 

## Commands
Run ng g c component-name` to generate a new component
Run ng g s service-name to genarate a service
Run ng build to build the project
Run ng test to execute unit tests
Run ng e2e for end to end tests

# Next Updates 
 More UI
 More Live Features 
 Menus
 
 # Notes
Initially wanted to display historical data (weather report for past 30 days and future 60 days), but couldn't find any free open weather information API available for historical data. Most of the API's are not returning the desired information, so i developed this to display one week forecast for now and will update the application to display historical data later. 
