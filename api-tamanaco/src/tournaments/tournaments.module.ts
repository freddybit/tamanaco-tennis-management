import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournamentsService } from './services/tournaments.service';
import { TournamentsController } from './controllers/tournaments.controller';
import { Participation } from './entities/participation.entity';
import { Tournament } from './entities/tournament.entity';
import { TournamentRepository } from './repositories/tournament.repository';
import { TournamentStage } from './entities/tournament-stage.entity';
import { StageParticipation } from './entities/stage-participation';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tournament, Participation, TournamentStage, StageParticipation]),
  ],
  controllers: [TournamentsController],
  providers: [TournamentsService, TournamentRepository],
})
export class TournamentsModule {}
  