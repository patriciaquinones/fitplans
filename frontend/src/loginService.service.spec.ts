/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoginServiceService } from './services/loginService.service'; // Import the missing module

describe('Service: LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginServiceService]
    });
  });

  it('should ...', inject([LoginServiceService], (service: LoginServiceService) => {
    expect(service).toBeTruthy();
  }));
});
