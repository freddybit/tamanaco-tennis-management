import { Repository, UpdateResult } from "typeorm";
import { Player } from "../entities/player.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { BadGatewayException, Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class PlayerRepository {

    private readonly typeOrmRepository: Repository<Player>;

    constructor(
        @InjectRepository(Player) 
        typeOrmRepository: Repository<Player>
    ) { 
        this.typeOrmRepository = typeOrmRepository;
    }

    async create(player:Player) {
        const newPlayer = this.typeOrmRepository.create(player);
        return await this.typeOrmRepository.save(newPlayer);
    }

    async findById(profileKey: number): Promise<Player | null> {
        const player = await this.typeOrmRepository.findOne({
            where: { profileKey },
            relations: {
                identityDocument: true,
                emails: true,
                phones: true,
                playerClubs: {
                    club: true,
                },
                verifications: true,
                playerDoubles: true,
                place: true,
                stats: true,
                participations: true,
                playerTennisCategories: {
                    tennisCategory: true,
                },
            },
        });

        if (!player) {
            throw new NotFoundException(`Player with profileKey ${profileKey} not found`);
        }
        return player;
    }

    async findAll(): Promise<Player[]> {
        return await this.typeOrmRepository.find();
    }

    async findAllWithRelations(): Promise<Player[]> {
        return await this.typeOrmRepository.find({
            relations: {
                identityDocument: true,
                emails: true,
                phones: true,
                playerClubs: {
                    club: true,
                },
                verifications: true,
                playerDoubles: true,
                place: true,
                stats: true,
                participations: true,
                playerTennisCategories: {
                    tennisCategory: true,
                },
            },
        });
    }

    async update(updatePlayer: Player) {
        await this.typeOrmRepository.update(
            { profileKey: updatePlayer.profileKey },
            { 
                firstName: updatePlayer.firstName,
                firstLastname: updatePlayer.firstLastname,
                secondName: updatePlayer.secondName,
                secondLastname: updatePlayer.secondLastname,
                birthday: updatePlayer.birthday,
                place_placeKey: updatePlayer.place_placeKey,
                photoOne: updatePlayer.photoOne,
                photoTwo: updatePlayer.photoTwo,
            }
        );
    }

    async deleteById(playerKey: number) {
        await this.typeOrmRepository.delete(
            { profileKey: playerKey },
        )
    }

}