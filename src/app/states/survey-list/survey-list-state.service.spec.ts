import { TestBed } from '@angular/core/testing';

import { SurveyListStateService } from './survey-list-state.service';

describe('SurveyListStateService', () => {
  let service: SurveyListStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyListStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
