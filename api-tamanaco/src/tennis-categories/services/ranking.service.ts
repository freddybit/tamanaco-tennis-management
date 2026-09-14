import { Injectable } from "@nestjs/common";
import { CreateRankingDto } from "../dto/create-ranking.dto";
import { Ranking } from "../entities/ranking.entity";
import { RankingRepository } from "../repositories/ranking.repository";

@Injectable()
export class RankingService {

    private readonly rankingRepository: RankingRepository;

    constructor(rankingRepository: RankingRepository) {
        this.rankingRepository = rankingRepository;
    }

    async create(ranking: CreateRankingDto) {
        const newRanking = new Ranking({
            name: ranking.name,
        });
        return await this.rankingRepository.create(newRanking);
    }

    async findById(rankingKey: number) {
        if (!rankingKey) {
            throw new Error('Error: rankingKey is null or undefined');
        }
        const ranking = await this.rankingRepository.findById(rankingKey);
        if (!ranking) {
            throw new Error(`Error: Ranking with key ${rankingKey} not found`);
        }
        return ranking;
    }

    async findAll() {
        return await this.rankingRepository.findAll();
    }

    async delete(rankingKey: number) {
        if (!rankingKey) {
            throw new Error('Error: rankingKey is null or undefined');
        }
        return await this.rankingRepository.remove(rankingKey);
    }

}