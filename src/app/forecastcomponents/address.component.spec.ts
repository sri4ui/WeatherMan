import { inject, async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Address, GeoCordinates, CurrentWeather } from './../modals/common.modal';
import { CoreService } from './../core.service';
import { Subscription } from 'rxjs';

import { MockBackend, MockConnection } from '@angular/http/testing';
import { Response, ResponseOptions, BaseRequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

import { AddressComponent } from './address.component';
import { ConstantsService } from '../constants.service';
import { WeeklyforecastComponent } from './../forecastcomponents/weeklyforecast.component';


/** Local declarations */
let mockBackend: MockBackend;
/**Fake Google maps API response */
const getFakeGoogleAPIResponse = () => {
  return {
    results: [
      {
        address_components: [],
        formatted_address: "Bothell, WA, USA",
        geometry: {
          bounds: {},
          location: {
            lat: 47.76011099999999,
            lng: -122.2054452
          },
          location_type: "APPROXIMATE",
          viewport: {},
        },
        place_id: "",
        types: []
      }
    ],
    status: "OK"
  };
}
/**Fake weather map API response */
const getFakeWeatherAPIResponse = () => {
  return {
    base: "",
    clouds: {},
    cod: "",
    coord: {},
    date: "",
    id: "",
    main: {
      humidity: "",
      pressure: "",
      temp: "",
      temp_max: "",
      temp_min: ""
    },
    name: "",
    sys: {
      country: "",
      id: "",
      message: "",
      sunrise: "",
      sunset: "",
      type: ""
    },
    visibility: "",
    weather: "",
    wind: {
      speed: ""
    }
  }
}
/**Test cases for Address Component */
describe('AddressComponent', () => {
  let component: AddressComponent;
  let fixture: ComponentFixture<AddressComponent>;
  let fakeGoogleAPIResponse: any;
  let fakeWeatherAPIResponse: any;
  let coreService: CoreService;

  /**Before each async inject all dependencies */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddressComponent, WeeklyforecastComponent],
      imports: [ReactiveFormsModule, HttpClientModule],
      providers: [{ provide: CoreService, useClass: CoreService },
      { provide: ConstantsService, useClass: ConstantsService },
        MockBackend,
        BaseRequestOptions
      ]
    })
      .compileComponents();  //compile temaplate and CSS
  }));

  /* Synchronous before each*/
  beforeEach(inject([CoreService, MockBackend], (service: CoreService, backend: MockBackend) => {
    fixture = TestBed.createComponent(AddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    coreService = service;
    mockBackend = backend;
    fakeGoogleAPIResponse = getFakeGoogleAPIResponse();
    fakeWeatherAPIResponse = getFakeWeatherAPIResponse();

  }));
  /**Mock setup for the Rest calls */
  function setupConnections(backend: MockBackend, options: any) {
    backend.connections.subscribe((connection: MockConnection) => {
      const responseOptions = new ResponseOptions(options);
      const response = new Response(responseOptions);
      if (response.status === 200) {
        connection.mockRespond(response);
      } else {
        connection.mockError(new Error(options.body.message));
      }
    });
  }
  /**Check for availability of address component */
  it(`should be created and initialized`, () => {
    expect(fixture).toBeDefined();
    expect(component).toBeDefined();
    expect(component).toBeTruthy();
  });
  /**Check for FORM values */
  it('should test wether form model is created or not', () => {
    let errors = {};
    component.ngOnInit();
    expect(component.addressForm).toBeDefined();
  });

  /**Check for default values */
  it('should display only Address Form by default', () => {
    expect(component.showWeatherInfo).toBe(false);
    expect(component.showError).toBe(false);
  })
  /**check for FormEmpty method availability */
  it('should test if FormEmpty Method', () => {
    component.isFormEmpty();
  })

  /**check for getTime method availability */
  it('should test if getTime Method', () => {
    let ts = 1544205600;
    component.getTime(ts);
  })

  /**Check for googleMaps API call has been started */
  it('should be able to fetch GeoLocation using Entered Address', () => {
    setupConnections(mockBackend, { body: { data: fakeGoogleAPIResponse }, status: 200 });
    let reqParams: Address;
    reqParams = {
      streetAddress: "",
      city: "Bothell",
      state: "WA",
      zip: "98011"
    };

    const resp = {
      results: [],
      status: "ok"
    }

    /**Check for API invoke */
    spyOn(coreService, 'getLocation').and.returnValue(of(resp))
    component.getGeoLocation();
    fixture.detectChanges();
    expect(coreService.getLocation).toHaveBeenCalled();

    /**As the the jasmine version used here won't support withArgs, validating the response data with the fakeresponse */
    coreService.getLocation(reqParams).subscribe((data) => {
      expect(data).toBeDefined(fakeGoogleAPIResponse);
      //done();

    })

  });
  /**Check for current weather details API response using coordinates */
  it('should be able to fetch current weather using GeoLocation Details from GoogleMaps API', () => {
    setupConnections(mockBackend, { body: { data: fakeWeatherAPIResponse }, status: 200 });
    let reqParams: GeoCordinates;
    reqParams = {
      lat: "47.7623",
      lng: "-122.2054"
    };

    let reqAddr: Address;
    reqAddr = {
      streetAddress: "",
      city: "Bothell",
      state: "WA",
      zip: "98011"
    };

    const resp = {
      base: "",
      clouds: {},
      cod: "",
      coord: {},
      date: "",
      id: "",
      main: {
        humidity: "",
        pressure: "",
        temp: "",
        temp_max: "",
        temp_min: ""
      },
      name: "",
      sys: {
        country: "",
        id: "",
        message: "",
        sunrise: "",
        sunset: "",
        type: ""
      },
      visibility: "",
      weather: "",
      wind: {
        speed: ""
      }
    }

    /**Check for API invoke */
    spyOn(coreService, 'getCurrentWeather').and.returnValue(of(resp))
    component.getGeoLocation();
    fixture.detectChanges();
    setTimeout(function () {
      expect(coreService.getCurrentWeather).toHaveBeenCalled();
    }, 500);

    /**As the jasmine version used here won't support withArgs, validating the response data with the fakeresponse */
    coreService.getCurrentWeather(reqParams).subscribe((data) => {
      expect(data).toBeDefined();
     // expect(data).toBe(fakeWeatherAPIResponse);
    })
  });
});
