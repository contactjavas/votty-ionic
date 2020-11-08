import { IdNamePairData } from "./id-name-pair";

export interface Form {
}

export interface AddRespondentFormData {
  genders: IdNamePairData[];
  educations: IdNamePairData[];
  religions: IdNamePairData[];
}