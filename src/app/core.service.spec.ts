import { TestBed, inject } from '@angular/core/testing';

import { CoreService } from './core.service';
import { Address, GeoCordinates} from '././modals/common.modal';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Response, ResponseOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

/** Local declarations */
let mockBackend: MockBackend;
let locationService: CoreService;



describe('CoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      providers: [
        CoreService,
        MockBackend
      ]
    });
  });

/**Inject all dependencies before each test */
beforeEach(inject([CoreService, MockBackend], (service: CoreService, backend: MockBackend) => {
  locationService = service;
  mockBackend = backend;
}));

  /**Check if coreservice class is available and initialized */
  it('should be created and initialized', inject([CoreService], (service: CoreService) => {
    expect(service).toBeTruthy();
    expect(service).toBeDefined();
  }));

/**Check all the methods of coreservices class */
  describe('Tests for core services methods', () => {
   //let googleAPIResponse: Geometry;
   // let response: Response;

    /**check for getlocation method availability */
    it('getLocation should be available', () => {
      expect(locationService.getLocation).toBeTruthy();
    });

    /**check for Google API location call success or failure */
    it('should be able to get location coordinates by address', () => {
     // setupConnections(mockBackend, { body: { data: fakegoogleAPIResponse }, status: 200 });
      let addrReq : Address;
      addrReq = {
        streetAddress: " ",
        city: "Bothell",
        state:  "WA",
        zip : ""
      };
      
      locationService.getLocation(addrReq).subscribe((resp) => {
        let data = resp;
        expect(data).toBeDefined('should have success or error response');
      });
    });

    /**check getCurrentWeather Method availability */
    it('getCurrentWeather should be available', () => {
      expect(locationService.getCurrentWeather).toBeTruthy();
    });

    /**check for open weather API call success or failure */
    it('should be able to get weather details by GeoCoordinates', () => {
      // setupConnections(mockBackend, { body: { data: fakegoogleAPIResponse }, status: 200 });
       let geoReq : GeoCordinates;
       geoReq = {
        lat: "47.7623",
        lng: "-122.2054"
       };
       
       locationService.getCurrentWeather(geoReq).subscribe((resp) => {
         let data = resp;
         expect(data).toBeDefined('should have success or error response');
       });
     });

     /**check for getWeeklyWeather Method availability */
     it('getWeeklyWeather should be available', () => {
      expect(locationService.getWeeklyWeather).toBeTruthy();
    });

    /**check for weekly forecast API call success or failure */
    it('should be able to get this week weather details by GeoCoordinates', () => {
      // setupConnections(mockBackend, { body: { data: fakegoogleAPIResponse }, status: 200 });
       let geoReq : GeoCordinates;
       geoReq = {
        lat: "47.7623",
        lng: "-122.2054"
       };
 
       locationService.getWeeklyWeather(geoReq).subscribe((resp) => {
         let data = resp;
         expect(data).toBeDefined('should have success or error response');
       });
     });

  });


});
