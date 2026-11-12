import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Club } from "../entities/club.entity";

@Injectable()
export class ClubRepository {

    private readonly typeOrmRepository: Repository<Club>;

    constructor(
        @InjectRepository(Club) 
        typeOrmRepository: Repository<Club>
    ) { 
        this.typeOrmRepository = typeOrmRepository;
    }

    async create(place: Club) {
        const newPlace = this.typeOrmRepository.create(place);
        return await this.typeOrmRepository.save(newPlace);
    }

    async findById(clubKey: number): Promise<Club | null> {
        return await this.typeOrmRepository.findOne({
            where: { clubKey },
            relations: {
                playerClubs: true,
                place: true
            }
        });
    }

    async findAll(): Promise<Club[]> {
        return await this.typeOrmRepository.find();
    }

    async update(updateClub: Club) {
        await this.typeOrmRepository.update(    
            { clubKey: updateClub.clubKey },
            { 
                clubName: updateClub.clubName,
                Place_placeKey: updateClub.Place_placeKey
            }
        );
    }

    async deleteById(clubKey: number) {
        await this.typeOrmRepository.delete({ clubKey });
    }
    
}