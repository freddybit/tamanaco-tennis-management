import { Injectable } from "@nestjs/common";
import { Place } from "../entities/place.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class PlaceRepository {

    private readonly typeOrmRepository: Repository<Place>;

    constructor(
        @InjectRepository(Place) 
        typeOrmRepository: Repository<Place>
    ) { 
        this.typeOrmRepository = typeOrmRepository;
    }

    async create(place: Place) {
        const newPlace = this.typeOrmRepository.create(place);
        return await this.typeOrmRepository.save(newPlace);
    }

    async findById(placeKey: number): Promise<Place | null> {
        return await this.typeOrmRepository.findOne({
            where: { placeKey },
            relations: {
                places: true, 
                players: true,
                clubs: true
            }
        });
    }

    async findByParent(parentKey: number): Promise<Place[]> {
        return await this.typeOrmRepository.find({
            where: { place_placeKey: parentKey },
            relations: {
                places: true, 
                players: true,
                clubs: true
            }
        });
    }

    async findAll(): Promise<Place[]> {
        return await this.typeOrmRepository.find();
    }

    async update(updatePlace: Place) {
        await this.typeOrmRepository.update(    
            { placeKey: updatePlace.placeKey },
            { 
                type: updatePlace.type,
                name: updatePlace.name,
                place_placeKey: updatePlace.place_placeKey
            }
        );
    }

    async deleteById(placeKey: number) {
        await this.typeOrmRepository.delete({ placeKey });
    }

}