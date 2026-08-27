import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournamentsService } from './services/tournaments.service';
import { TournamentsController } from './controllers/tournaments.controller';
import { Participation } from './entities/participation.entity';
import { Tournament } from './entities/tournament.entity';
import { TournamentRepository } from './repositories/tournament.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tournament, Participation]),
  ],
  controllers: [TournamentsController],
  providers: [TournamentsService, TournamentRepository],
})
export class TournamentsModule {}
  