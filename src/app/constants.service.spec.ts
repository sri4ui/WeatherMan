import { TestBed, inject } from '@angular/core/testing';

import { ConstantsService } from './constants.service';

let constants: ConstantsService;

describe('ConstantsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConstantsService]
    });
  });

/**Inject all dependencies before each test */
beforeEach(inject([ConstantsService], (service: ConstantsService) => {
  constants = service;
}));
/**check for constants service availability */
  it('should be created and initialized', () => {
    expect(constants).toBeTruthy();
    expect(constants).toBeDefined();
  });
/**Validation for Google API key */
  it('Google API Key is Valid', () => {
    let googleAPIKey = 'AIzaSyAN9o32ZljOZo30sJ8_sWxerfQqfTYT2gM';
    expect(constants.OPEN_GOOGLE_API_KEY).toBe(googleAPIKey);
  });

  /**Validation for Open Weather API Key */
  it('Open Weather API Key is Valid', () => {
    let openWeatherAPIKey = 'c4bba93d2547c350e72bf5b0e84c90fa';
    expect(constants.OPEN_WEATHER_API_KEY).toBe(openWeatherAPIKey);
  });
});
