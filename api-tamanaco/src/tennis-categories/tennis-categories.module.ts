import { Module } from '@nestjs/common';
import { TennisCategoriesService } from './services/tennis-categories.service';
import { TennisCategoriesController } from './controllers/tennis-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TennisCategory } from './entities/tennis-category.entity';
import { Ranking } from './entities/ranking.entity';
import { PlayerTennisCategory } from './entities/player-tennis-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TennisCategory, Ranking, PlayerTennisCategory])],
  controllers: [TennisCategoriesController],
  providers: [TennisCategoriesService],
})
export class TennisCategoriesModule {}
