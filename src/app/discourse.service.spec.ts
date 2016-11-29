/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DiscourseService } from './discourse.service';

describe('DiscourseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiscourseService]
    });
  });

  it('should ...', inject([DiscourseService], (service: DiscourseService) => {
    expect(service).toBeTruthy();
  }));
});
