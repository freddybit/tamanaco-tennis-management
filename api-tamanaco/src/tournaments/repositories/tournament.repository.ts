import { Repository } from "typeorm";
import { Tournament } from "../entities/tournament.entity";
import { InjectRepository } from "@nestjs/typeorm";

export class TournamentRepository {

    private typeOrmRepository: Repository<Tournament>;

    constructor(
        @InjectRepository(Tournament)
        typeOrmRepository: Repository<Tournament>
    ) {
        this.typeOrmRepository = typeOrmRepository;
    }

    async create(tournament: Tournament) {
        const newTournament = this.typeOrmRepository.create(tournament);
        return await this.typeOrmRepository.save(newTournament);
    }

    async findById(tourKey: number): Promise<Tournament | null> {
        const tournament = await this.typeOrmRepository.findOne({
            where: { tourKey },
            relations: {
                participations: true,
                tennisCategory: true,
            },
        });
        return tournament || null;
    }

    async findAll(): Promise<Tournament[]> {
        return await this.typeOrmRepository.find();
    }

    async update(updateTournament: Tournament) {}

    async remove(tourKey: number) {
        const tournament = await this.findById(tourKey);
        if (!tournament) {
            return false;
        }
        await this.typeOrmRepository.remove(tournament);
        return true;
    }

}