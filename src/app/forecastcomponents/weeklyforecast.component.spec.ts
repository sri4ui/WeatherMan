import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { WeeklyforecastComponent } from './weeklyforecast.component';
import { CoreService } from './../core.service';
import { GeoCordinates, ForecastWeather } from './../modals/common.modal';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Response, ResponseOptions, BaseRequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

/** Local declarations */
let mockBackend: MockBackend;

const getWeatherResponse = () => {
  return {
    city: { "id": 5787829, "name": "Bothell", "coord": { "lat": 47.7623, "lon": -122.2054 }, "country": "US", "population": 33505 },
    cnt: 40,
    cod: "200",
    list: [{ "dt": 1544184000, "main": { "temp": 269.55, "temp_min": 269.226, "temp_max": 269.55, "pressure": 1025.2, "sea_level": 1034.63, "grnd_level": 1025.2, "humidity": 100, "temp_kf": 0.32 }, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01n" }], "clouds": { "all": 0 }, "wind": { "speed": 2.86, "deg": 108.502 }, "sys": { "pod": "n" }, "dt_txt": "2018-12-07 12:00:00" },
    { "dt": 1544194800, "main": { "temp": 268.84, "temp_min": 268.597, "temp_max": 268.84, "pressure": 1025.42, "sea_level": 1034.94, "grnd_level": 1025.42, "humidity": 100, "temp_kf": 0.24 }, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01n" }], "clouds": { "all": 0 }, "wind": { "speed": 2.63, "deg": 107.001 }, "sys": { "pod": "n" }, "dt_txt": "2018-12-07 15:00:00" }
    ],
    message: 0.0044
  };
}

describe('WeeklyforecastComponent', () => {
  let component: WeeklyforecastComponent;
  let fixture: ComponentFixture<WeeklyforecastComponent>;
  let fakeWeatherForecastResponse: any;
  let coreService: CoreService;



  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WeeklyforecastComponent],
      imports: [
        HttpClientModule,
      ],
      providers: [
        CoreService,
        BaseRequestOptions,
        MockBackend
      ]
    })
      .compileComponents();
  }));

  beforeEach(inject([CoreService, MockBackend], (service: CoreService, backend: MockBackend) => {
    fixture = TestBed.createComponent(WeeklyforecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    coreService = service;
    mockBackend = backend;
    fakeWeatherForecastResponse = getWeatherResponse();
  }));

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


  it(`should be created and initialized`, () => {
    expect(fixture).toBeDefined();
    expect(component).toBeDefined();
  });



  it('should be able to fetch this week weather details by location', () => {
    setupConnections(mockBackend, { body: { data: fakeWeatherForecastResponse }, status: 200 });
    let reqParams: GeoCordinates;
    reqParams = {
      lat: "47.7623",
      lng: "-122.2054"
    };
    const resp = {
      city: {},
      cnt: "",
      cod: "",
      list: [],
      message: ""
    }

    //component.displayWeeklyForecast(reqParams);

    /**Check for API invoke */
    spyOn(coreService, 'getWeeklyWeather').and.returnValue(of(resp))
    component.displayWeeklyForecast(reqParams);
    fixture.detectChanges();
    expect(coreService.getWeeklyWeather).toHaveBeenCalled();

    coreService.getWeeklyWeather(reqParams).subscribe((data) => {
      expect(data).toBeDefined();
      // expect(data).toBe(fakeWeatherForecastResponse);
    })


  });
});
