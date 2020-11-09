import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InputSurveyPage } from './input-survey.page';

describe('InputSurveyPage', () => {
  let component: InputSurveyPage;
  let fixture: ComponentFixture<InputSurveyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputSurveyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InputSurveyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
