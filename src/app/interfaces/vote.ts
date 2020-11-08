import { SimpleRespondentData } from './respondent';
import { SimpleSurveyData } from './survey';

export interface Vote {
}

export interface VoteData {
  id: number;
  createdAt: string;
  survey: SimpleSurveyData;
  respondent: SimpleRespondentData;
}