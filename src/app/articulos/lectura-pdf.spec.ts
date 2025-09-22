import { TestBed } from '@angular/core/testing';

import { LecturaPdf } from './lectura-pdf';

describe('LecturaPdf', () => {
  let service: LecturaPdf;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LecturaPdf);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
