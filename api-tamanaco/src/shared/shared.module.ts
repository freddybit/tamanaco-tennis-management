import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceController } from './controllers/place.controller';
import { ClubController } from './controllers/club.controller';
import { Place } from './entities/place.entity';
import { Email } from './entities/email.entity';
import { Phone } from './entities/phone.entity';
import { Club } from './entities/club.entity';
import { IdentityDocument } from './entities/identity-document.entity';
import { PlayerClub } from './entities/player-club.entity';
import { Verification } from './entities/verification.entity';
import { PlaceRepository } from './repositories/place.repository';
import { ClubRepository } from './repositories/club.repository';
import { EmailRepository } from './repositories/email.repository';
import { PhoneRepository } from './repositories/phone.repository';
import { IdentityDocumentRepository } from './repositories/identity-document.repository';
import { PlaceService } from './services/place.service';
import { ClubService } from './services/club.service';
import { EmailService } from './services/email.service';
import { PhoneService } from './services/phone.service';
import { IdentityDocumentService } from './services/identity-document.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Place,
      Email,
      Phone,
      Club,
      IdentityDocument,
      PlayerClub,
      Verification,
    ]),
  ],
  controllers: [
    PlaceController,
    ClubController,
  ],
  providers: [
    PlaceRepository,
    ClubRepository,
    EmailRepository,
    PhoneRepository,
    IdentityDocumentRepository,
    PlaceService,
    ClubService,
    EmailService,
    PhoneService,
    IdentityDocumentService,
  ],
  exports: [
    TypeOrmModule,
    PlaceService,
    ClubService,
    EmailService,
    PhoneService,
    IdentityDocumentService,
  ],
})
export class SharedModule {}