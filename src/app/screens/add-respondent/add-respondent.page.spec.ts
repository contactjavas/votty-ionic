import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddRespondentPage } from './add-respondent.page';

describe('AddRespondentPage', () => {
  let component: AddRespondentPage;
  let fixture: ComponentFixture<AddRespondentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRespondentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddRespondentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
