import { TestBed } from '@angular/core/testing';

import { AivideoService } from './aivideo.service';

describe('AivideoService', () => {
  let service: AivideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AivideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
