import { Repository } from "typeorm";
import { Ranking } from "../entities/ranking.entity";
import { InjectRepository } from "@nestjs/typeorm";

export class RankingRepository {

    private typeOrmRepository: Repository<Ranking>;

    constructor(
        @InjectRepository(Ranking)
        typeOrmRepository: Repository<Ranking>
    ) {
        this.typeOrmRepository = typeOrmRepository;
    }

    async create(ranking: Ranking) {
        const newRanking = this.typeOrmRepository.create(ranking);
        return await this.typeOrmRepository.save(newRanking);
    }

    async findById(rankingKey: number): Promise<Ranking | null> {
        const ranking = await this.typeOrmRepository.findOne({
            where: { rankingKey },
            relations: {
                tennisCategories: true,
            },
        });
        return ranking || null;
    }

    async findAll(): Promise<Ranking[]> {
        return await this.typeOrmRepository.find();
    }

    async update(updateRanking: Ranking) {}

    async remove(rankingKey: number) {
        const ranking = await this.findById(rankingKey);
        if (!ranking) {
            return false;
        }
        await this.typeOrmRepository.remove(ranking);
        return true;
    }

}