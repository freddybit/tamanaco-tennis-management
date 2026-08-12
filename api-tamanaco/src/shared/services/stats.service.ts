import { BadRequestException, Injectable } from "@nestjs/common";
import { StatsRepository } from "../repositories/stats.repository";
import { QueryRunner } from "typeorm";
import { CreateStatsDto } from "../dto/create-stats.dto";
import { Stats } from "../entities/stats.entity";

@Injectable()
export class StatsService {

    private readonly statsRepository: StatsRepository;

    constructor(statsRepository: StatsRepository) {
        this.statsRepository = statsRepository;
    }

    async createWithRunner(queryRunner: QueryRunner, stats: CreateStatsDto, player_profileKey: number) {

        if (!stats) {
            throw new BadRequestException('Error: Stats is null or undefined');
        }

        const newStats: Stats = new Stats({
            matchesPlayed: stats.matchesPlayed,
            matchesWon: stats.matchesWon,
            matchesLost: stats.matchesLost,
            averageMatchesWon: stats.averageMatchesWon,
            setsWon: stats.setsWon,
            setsLost: stats.setsLost,
            averageSetsWon: stats.averageSetsWon,
            gamesWon: stats.gamesWon,
            gamesLost: stats.gamesLost,
            averageGamesWon: stats.averageGamesWon
        });

        return await queryRunner.manager.save(newStats)

    }
}