import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VoteListPage } from './vote-list.page';

describe('VoteListPage', () => {
  let component: VoteListPage;
  let fixture: ComponentFixture<VoteListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VoteListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
