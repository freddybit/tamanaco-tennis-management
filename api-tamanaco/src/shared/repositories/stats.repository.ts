
import { Repository } from "typeorm";
import { Stats } from "../entities/stats.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class StatsRepository {

    private readonly typeOrmRepository: Repository<Stats>;

    constructor(
        @InjectRepository(Stats)
        typeOrmRepository: Repository<Stats>
    ) {
        this.typeOrmRepository = typeOrmRepository;
    }

    async create(stats: Stats) {
        const newStats = this.typeOrmRepository.create(stats);
        return await this.typeOrmRepository.save(newStats);
    }

    async findById(statsKey: number): Promise<Stats | null> {
        return await this.typeOrmRepository.findOne({
            where: { statsKey },
            relations: {
                player: true
            }
        });
    }

    async findAll(): Promise<Stats[]> {
        return await this.typeOrmRepository.find();
    }

    async update(updateStats: Stats) {
        await this.typeOrmRepository.update(
            { statsKey: updateStats.statsKey },
            {
                matchesPlayed: updateStats.matchesPlayed,
                matchesWon: updateStats.matchesWon,
                matchesLost: updateStats.matchesLost,
                averageMatchesWon: updateStats.averageMatchesWon,
                setsWon: updateStats.setsWon,
                setsLost: updateStats.setsLost,
                averageSetsWon: updateStats.averageSetsWon,
                gamesWon: updateStats.gamesWon,
                gamesLost: updateStats.gamesLost,
                averageGamesWon: updateStats.averageGamesWon,
                player_profileKey: updateStats.player_profileKey
            }
        );
    }

    async deleteById(statsKey: number) {
        await this.typeOrmRepository.delete(
            { statsKey }
        );
    }
    
}