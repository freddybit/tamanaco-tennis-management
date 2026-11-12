import { Club } from "./club.model";
import { Email } from "./email.model";
import { IdentityDocument } from "./identity-document.model";
import { Phone } from "./phone.model";
import { TennisCategory } from "./tennis-category.model";

export interface Player {
  profileKey: number;
  firstName: string;
  secondName?: string | null;
  firstLastname: string;
  secondLastname?: string | null;
  birthday?: string | null;
  sex: string;
  photoOne?: string | null;
  photoTwo?: string | null;
  place_placeKey?: number | null;
  identityDocuments?: IdentityDocument | null;
  emails?: Email[] | null;
  phones?: Phone[] | null;
  tennisCategories?: TennisCategory[] | null;
  clubs?: Club[] | null;
}

export interface PlayerTable {
  profileKey: number;
  firstName: string;
  secondName?: string | null;
  firstLastname: string;
  secondLastname?: string | null;
  birthday?: string | null;
  sex: string;
  photoOne?: string | null;
  docNumber?: number[] | null;
  clubName?: string[] | null;
  categories?: string[] | null;
}

export interface CreatePlayerPayload {
  firstName: string;
  secondName: string | null;
  firstLastname: string;
  secondLastname: string | null;
  birthday: Date | null;
  sex: string;
  place_placeKey: number | null;
  photoOne: string | null;
  photoTwo: string | null;

  identityDocuments?: IdentityDocument | null;
  emails?: Email[] | null;
  phones?:
    | {
        areaCode: string;
        operatorCode: string;
        phoneNumber: string;
      }[]
    | null;
  tennisCategoriesKeys?: number[] | null;
  clubsKeys?: number[] | null;
}
