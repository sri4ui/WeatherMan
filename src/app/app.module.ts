import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AddressComponent } from './forecastcomponents/address.component';
import { WeeklyforecastComponent } from './forecastcomponents/weeklyforecast.component';
@NgModule({
  declarations: [
    AppComponent,
    AddressComponent,
    WeeklyforecastComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
