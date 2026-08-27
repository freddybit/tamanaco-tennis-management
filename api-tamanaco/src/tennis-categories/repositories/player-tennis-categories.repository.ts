import { Repository } from "typeorm";
import { PlayerTennisCategory } from "../entities/player-tennis-category.entity";
import { InjectRepository } from "@nestjs/typeorm";

export class PlayerTennisCategoryRepository {

    private typeOrmRepository: Repository<PlayerTennisCategory>;

    constructor(
        @InjectRepository(PlayerTennisCategory)
        typeOrmRepository: Repository<PlayerTennisCategory>
    ) {
        this.typeOrmRepository = typeOrmRepository;
    }

    async create(playerTennisCategory: PlayerTennisCategory) {
        const newPlayerTennisCategory = this.typeOrmRepository.create(playerTennisCategory);
        return await this.typeOrmRepository.save(newPlayerTennisCategory);
    }

    async findById(plaTenCatKey: number): Promise<PlayerTennisCategory | null> {
        const playerTennisCategory = await this.typeOrmRepository.findOne({
            where: { plaTenCatKey },
            relations: {
                player: true,
                tennisCategory: true,
            },
        });
        return playerTennisCategory || null;
    }

    async findAll(): Promise<PlayerTennisCategory[]> {
        return await this.typeOrmRepository.find();
    }

    async update(updatePlayerTennisCategory: PlayerTennisCategory) {}

    async remove(plaTenCatKey: number) {
        const playerTennisCategory = await this.findById(plaTenCatKey);
        if (!playerTennisCategory) {
            return false;
        }
        await this.typeOrmRepository.remove(playerTennisCategory);
        return true;
    }

}