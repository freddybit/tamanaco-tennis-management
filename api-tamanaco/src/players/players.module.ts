import { Module } from '@nestjs/common';
import { PlayersService } from './services/players.service';
import { PlayersController } from './controllers/players.controller';
import { PlayerRepository } from './repositories/player.repository';
import { Player } from './entities/player.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerDouble } from './entities/player-double.entity';
import { Double } from './entities/double.entity';
import { SharedModule } from '../shared/shared.module';
import { Place } from '../shared/entities/place.entity';
import { Club } from '../shared/entities/club.entity';
import { Email } from '../shared/entities/email.entity';
import { IdentityDocument } from '../shared/entities/identity-document.entity';
import { Phone } from '../shared/entities/phone.entity';
import { PlayerClub } from '../shared/entities/player-club.entity';
import { Verification } from '../shared/entities/verification.entity';

@Module({
imports: [
    TypeOrmModule.forFeature([
      Player,
      PlayerDouble,
      Double,
      Place,
      Email,
      Phone,
      IdentityDocument,
      PlayerClub,
      Club,
      Verification,
    ]),
    SharedModule,
  ],
  controllers: [PlayersController],
  providers: [
    PlayersService,
    PlayerRepository,
  ],
})
export class PlayersModule {}
