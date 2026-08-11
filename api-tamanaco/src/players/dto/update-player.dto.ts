import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayerDto } from './create-player.dto';
import { CreatePlayerClubDto } from '../../shared/dto/create-player-club.dto';
import { CreatePhoneDto } from '../../shared/dto/create-phone.dto';
import { CreateEmailDto } from '../../shared/dto/create-email.dto';
import { CreateIdentityDocumentDto } from '../../shared/dto/create-identity-document.dto';

export interface UpdatePlayerDto {
    firstName: string;
    secondName: string | null;
    firstLastname: string;
    secondLastname: string | null;
    birthday: Date | null;
    sex: string;
    place_placeKey: number | null;
    photoOne: string | null;
    photoTwo: string | null;

}
