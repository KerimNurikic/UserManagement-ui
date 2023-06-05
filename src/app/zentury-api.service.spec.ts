import { TestBed } from '@angular/core/testing';

import { ZenturyApiService } from './zentury-api.service';

describe('ZenturyApiService', () => {
  let service: ZenturyApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZenturyApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
