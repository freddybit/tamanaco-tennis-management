import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournamentsService } from './services/tournaments.service';
import { TournamentsController } from './controllers/tournaments.controller';
import { Participation } from './entities/participation.entity';
import { Tournament } from './entities/tournament.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tournament, Participation]),
  ],
  controllers: [TournamentsController],
  providers: [TournamentsService],
})
export class TournamentsModule {}
