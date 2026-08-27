import { InjectRepository } from "@nestjs/typeorm";
import { TennisCategory } from "../entities/tennis-category.entity";
import { Repository } from "typeorm";

export class TennisCategoryRepository {

    private typeOrmRepository: Repository<TennisCategory>;

    constructor(
        @InjectRepository(TennisCategory)
        typeOrmRepository: Repository<TennisCategory>
    ) {
        this.typeOrmRepository = typeOrmRepository;
    }

    async create(tennisCategory: TennisCategory) {
        const newTennisCategory = this.typeOrmRepository.create(tennisCategory);
        return await this.typeOrmRepository.save(newTennisCategory);
    }

    async findById(catKey: number): Promise<TennisCategory | null> {
        const tennisCategory = await this.typeOrmRepository.findOne({
            where: { catKey },
            relations: {
                ranking: true,
                tournaments: true,
                playerTennisCategories: true,
            },
        });
        return tennisCategory || null;
    }

    async findAll(): Promise<TennisCategory[]> {
        return await this.typeOrmRepository.find();
    }

    async update(updateTennisCategory: TennisCategory) {}

    async remove(catKey: number) {
        const tennisCategory = await this.findById(catKey);
        if (!tennisCategory) {
            return false;
        }
        await this.typeOrmRepository.remove(tennisCategory);
        return true;
    }

}