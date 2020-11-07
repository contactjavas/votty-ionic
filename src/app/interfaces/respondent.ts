export interface Respondent {}

export interface RespondentData {
  id: number;
  name: String;
  ageRange: String;
  job: String;
  incomeRange: String;
  activeOnSocialMedia: number;
  gender: String;
  genderId: number;
}

export interface SimpleRespondentData {
  id: number;
  name: String;
}
