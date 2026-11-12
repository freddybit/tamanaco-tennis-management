import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Email } from "../entities/email.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class EmailRepository {

    private readonly teamOrmRepository: Repository<Email>;

    constructor(
        @InjectRepository(Email)
        teamOrmRepository: Repository<Email>
    ) {
        this.teamOrmRepository = teamOrmRepository;
    }

    async create(email: Email) {
        const newEmail = this.teamOrmRepository.create(email);
        return await this.teamOrmRepository.save(newEmail);
    }

    async findById(emailKey: number): Promise<Email | null> {
        return await this.teamOrmRepository.findOne({
            where: { emailKey },
            relations: {
                player: true
            }
        });
    }

    async findAll(): Promise<Email[]> {
        return await this.teamOrmRepository.find();
    }

    async update(updateEmail: Email) {
        await this.teamOrmRepository.update(
            { emailKey: updateEmail.emailKey },
            {
                username: updateEmail.username,
                atSymbol: updateEmail.atSymbol,
                domainName: updateEmail.domainName,
                Player_profileKey: updateEmail.Player_profileKey
            }
        );
    }

    async deleteById(emailKey: number) {
        await this.teamOrmRepository.delete(
            { emailKey }
        );
    }

}