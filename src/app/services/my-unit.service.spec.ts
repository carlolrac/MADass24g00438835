import { TestBed } from '@angular/core/testing';

import { MyUnitService } from './my-unit.service';

describe('MyUnitService', () => {
  let service: MyUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
