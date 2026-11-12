import { Module } from '@nestjs/common';
import { TennisCategoriesService } from './services/tennis-categories.service';
import { TennisCategoriesController } from './controllers/tennis-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TennisCategory } from './entities/tennis-category.entity';
import { Ranking } from './entities/ranking.entity';
import { PlayerTennisCategory } from './entities/player-tennis-category.entity';
import { RankingService } from './services/ranking.service';
import { PlayerTennisCategoryRepository } from './repositories/player-tennis-categories.repository';
import { TennisCategoryRepository } from './repositories/tennis-category.repository';
import { RankingRepository } from './repositories/ranking.repository';
import { RankingController } from './controllers/ranking.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TennisCategory, Ranking, PlayerTennisCategory])],
  controllers: [TennisCategoriesController, RankingController],
  providers: [TennisCategoriesService, RankingService, TennisCategoryRepository, RankingRepository, PlayerTennisCategoryRepository],
})
export class TennisCategoriesModule {}
