export interface Respondent {}

export interface RespondentData {
  id: number;
  name: string;
  ageRange: string;
  job: string;
  incomeRange: string;
  activeOnSocialMedia: number;
  gender: string;
  genderId: number;
}

export interface SimpleRespondentData {
  id: number;
  name: string;
}
