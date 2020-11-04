import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VoteDetailPage } from './vote-detail.page';

describe('VoteDetailPage', () => {
  let component: VoteDetailPage;
  let fixture: ComponentFixture<VoteDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VoteDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
