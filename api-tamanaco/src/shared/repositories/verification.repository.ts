import { Injectable } from "@nestjs/common";
import { Verification } from "../entities/verification.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class VerificationRepository {
    
    private readonly typeOrmRepository: Repository<Verification>;

    constructor(
        @InjectRepository(Verification)
        typeOrmRepository: Repository<Verification>
    ) {
        this.typeOrmRepository = typeOrmRepository;
    }

    async create(verification: Verification) {
        const newVerification = this.typeOrmRepository.create(verification);
        return await this.typeOrmRepository.save(newVerification);
    }

    async findById(verificationKey: number): Promise<Verification | null> {
        return await this.typeOrmRepository.findOne({
            where: { verificationKey },
            relations: {
                player: true
            }
        });
    }   

    async findAll(): Promise<Verification[]> {
        return await this.typeOrmRepository.find();
    }

    async update(updateVerification: Verification) {
        await this.typeOrmRepository.update(
            { verificationKey: updateVerification.verificationKey },
            {
                verificationDate: updateVerification.verificationDate,
                Player_profileKey: updateVerification.Player_profileKey
            }
        );
    }   

    async deleteById(verificationKey: number) {
        await this.typeOrmRepository.delete({ verificationKey });
    }

}