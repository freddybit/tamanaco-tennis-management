import { CreateEmailDto } from "../../shared/dto/create-email.dto";
import { CreateIdentityDocumentDto } from "../../shared/dto/create-identity-document.dto";
import { CreatePhoneDto } from "../../shared/dto/create-phone.dto";
import { CreatePlayerClubDto } from "../../shared/dto/create-player-club.dto";
import { CreateStatsDto } from "../../shared/dto/create-stats.dto";

export interface CreatePlayerDto {
    firstName: string;
    secondName: string | null;
    firstLastname: string;
    secondLastname: string | null;
    birthday: Date | null;
    sex: string;
    place_placeKey: number | null;
    photoOne: string | null;
    photoTwo: string | null;

    tennisCategoriesKeys?: number[] | null;
    stats?: CreateStatsDto | null;
    identityDocuments?: CreateIdentityDocumentDto | null;
    emails?: CreateEmailDto[] | null;
    phones?: CreatePhoneDto[] | null;
    clubs?: CreatePlayerClubDto[] | null;
}
