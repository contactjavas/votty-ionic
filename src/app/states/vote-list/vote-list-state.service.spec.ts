import { TestBed } from '@angular/core/testing';

import { VoteListStateService } from './vote-list-state.service';

describe('VoteListStateService', () => {
  let service: VoteListStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoteListStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
