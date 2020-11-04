import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RespondentListPage } from './respondent-list.page';

describe('RespondentListPage', () => {
  let component: RespondentListPage;
  let fixture: ComponentFixture<RespondentListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespondentListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RespondentListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
