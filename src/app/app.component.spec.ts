import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AddressComponent } from '././forecastcomponents/address.component'

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AddressComponent
      ],
    }).compileComponents();
  }));
  
});
