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
    

}