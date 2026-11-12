import { Injectable, NotFoundException } from "@nestjs/common";
import { PlaceRepository } from "../repositories/place.repository";
import { CreatePlaceDto } from "../dto/create-place.dto";
import { Place } from "../entities/place.entity";

@Injectable()
export class PlaceService {

    private readonly placeRepository: PlaceRepository;

    constructor(placeRepository: PlaceRepository) {
        this.placeRepository = placeRepository;
    }

    async create(place: CreatePlaceDto) {
        if (!place) {
            throw new Error('Error: place is null or undefined');
        }

        const newPlace = new Place({
            type: place.type,
            name: place.name,
            place_placeKey: place.place_placeKey ?? null,
        });
        
        return await this.placeRepository.create(newPlace);
    }

    async findById(placeKey: number) {
        if (!placeKey) {
        throw new Error('placeKey is required');
        }

        const place = await this.placeRepository.findById(placeKey);
        
        if (!place) {
            throw new NotFoundException(`Place with key ${placeKey} not found`);
        }

        return place;
    }

    async findByParent(parentKey: number) {
        if (!parentKey) {
            throw new Error('parentKey is required');
        }
        return await this.placeRepository.findByParent(parentKey);
    }

    async findAll() {
        return await this.placeRepository.findAll();
    }

    async deleteById(placeKey: number) {
        if (!placeKey) {
            throw new Error('Error: placeKey is null or undefined');
        }
        return await this.placeRepository.deleteById(placeKey);
    }
}