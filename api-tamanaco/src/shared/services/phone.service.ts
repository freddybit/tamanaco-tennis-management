import { Injectable } from "@nestjs/common";
import { PhoneRepository } from "../repositories/phone.repository";
import { CreatePhoneDto } from "../dto/create-phone.dto";
import { Phone } from "../entities/phone.entity";
import { QueryRunner } from "typeorm";

@Injectable()
export class PhoneService {
    
    private readonly phoneRepository: PhoneRepository;

    constructor(phoneRepository: PhoneRepository) {
        this.phoneRepository = phoneRepository;
    }

    async create(phone: CreatePhoneDto) {
        const newPhone = new Phone({
            areaCode: phone.areaCode,
            operatorCode: phone.operatorCode,
            phoneNumber: phone.phoneNumber,
            Player_profileKey: phone.Player_profileKey
        });
        return this.phoneRepository.create(newPhone);
    }

    async createWithRunner(queryRunner: QueryRunner, phone: CreatePhoneDto) {
        const newPhone = new Phone({
            areaCode: phone.areaCode,
            operatorCode: phone.operatorCode,
            phoneNumber: phone.phoneNumber,
            Player_profileKey: phone.Player_profileKey
        });
        return await queryRunner.manager.save(Phone, newPhone);
    }

    async findById(phoneKey: number) {
        if (!phoneKey) {
            throw new Error('Error: phoneKey is null or undefined');
        }
        return await this.phoneRepository.findById(phoneKey);
    }

    async findAll() {
        return await this.phoneRepository.findAll();
    }

    async deleteById(phoneKey: number) {
        if (!phoneKey) {
            throw new Error('Error: phoneKey is null or undefined');
        }
        return await this.phoneRepository.deleteById(phoneKey);
    }

}