/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AllServicesService } from './AllServices.service';

describe('Service: AllServices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllServicesService]
    });
  });

  it('should ...', inject([AllServicesService], (service: AllServicesService) => {
    expect(service).toBeTruthy();
  }));
});
