import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Phone } from "../entities/phone.entity";

@Injectable()
export class PhoneRepository {

    private typeOrmRepository: Repository<Phone>;

    constructor(
        @InjectRepository(Phone)
        typeOrmRepository: Repository<Phone>
    ) {
        this.typeOrmRepository = typeOrmRepository;
    }

    async create(phone: Phone) {
        const newPhone: Phone = this.typeOrmRepository.create(phone);
        await this.typeOrmRepository.save(newPhone);
    }

    async findById(phoneKey: number): Promise<Phone | null> {
        return await this.typeOrmRepository.findOne({
            where: { phoneKey }
        });
    }

    async findAll(): Promise<Phone[]> {
        return await this.typeOrmRepository.find();
    }

    async update(updatePhone: Phone) {
        await this.typeOrmRepository.update(
            { phoneKey: updatePhone.phoneKey },
            {
                areaCode: updatePhone.areaCode,
                operatorCode: updatePhone.operatorCode,
                phoneNumber: updatePhone.phoneNumber,
            }
        );
    }

    async deleteById(phoneKey: number) {
        await this.typeOrmRepository.delete({ phoneKey });
    }

}