import { IdNamePairData } from "./pairs";

export interface Form {
}

export interface AddRespondentFormData {
  genders: IdNamePairData[];
  educations: IdNamePairData[];
  religions: IdNamePairData[];
}