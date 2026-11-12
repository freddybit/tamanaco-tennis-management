import { Injectable } from "@nestjs/common";
import { ClubRepository } from "../repositories/club.repository";
import { CreateClubDto } from "../dto/create-club.dto";
import { Club } from "../entities/club.entity";

@Injectable()
export class ClubService {
    
    private readonly clubRepository: ClubRepository;

    constructor(clubRepository: ClubRepository) {
        this.clubRepository = clubRepository;
    }

    async create(club: CreateClubDto) {
        if (!club) {
            throw new Error('Error: club is null or undefined');
        }

        const newClub = new Club({
            clubName: club.clubName,
            Place_placeKey: club.Place_placeKey
        });
        return await this.clubRepository.create(newClub);
    }

    async findById(clubKey: number) {
        if (!clubKey) {
            throw new Error('Error: clubKey is null or undefined');
        }

        const club = await this.clubRepository.findById(clubKey);

        if (!club) {
            throw new Error(`Error: Club with clubKey ${clubKey} not found`);
        }
        
        return club;
    }

    async findAll() {
        return await this.clubRepository.findAll();
    }

    async deleteById(clubKey: number) {
        if (!clubKey) {
            throw new Error('Error: clubKey is null or undefined');
        }
        return await this.clubRepository.deleteById(clubKey);
    }
}