import { SimpleRespondentData } from './respondent';
import { SimpleSurveyData } from './survey';

export interface Vote {
}

export interface VoteData {
  id: number;
  createdAt: String;
  survey: SimpleSurveyData;
  respondent: SimpleRespondentData;
}