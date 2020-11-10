import { TestBed } from '@angular/core/testing';

import { RespondentListStateService } from './respondent-list-state.service';

describe('RespondentListStateService', () => {
  let service: RespondentListStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RespondentListStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
