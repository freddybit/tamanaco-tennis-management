import { Injectable } from "@nestjs/common";
import { EmailRepository } from "../repositories/email.repository";
import { CreateEmailDto } from "../dto/create-email.dto";
import { Email } from "../entities/email.entity";
import { QueryRunner } from "typeorm";

@Injectable()
export class EmailService {

    private readonly emailRepository: EmailRepository;

    constructor(emailRepository: EmailRepository) {
        this.emailRepository = emailRepository;
    }

    async create(email: CreateEmailDto) {
        if (!email) {
            throw new Error('Error: email is null or undefined');
        }

        const newEmail = new Email({
            username: email.username,
            domainName: email.domainName,
            Player_profileKey: email.Player_profileKey,
        });

        return await this.emailRepository.create(newEmail);
    }

    async createWithRunner(queryRunner: QueryRunner, email: CreateEmailDto) {
        if (!email) {
            throw new Error('Error: email is null or undefined');
        }
        const newEmail = new Email(email);
        return await queryRunner.manager.save(Email, newEmail);
    }

    async findById(emailKey: number): Promise<Email | null> {
        if (!emailKey) {
            throw new Error('Error: emailKey is null or undefined');
        }
        return await this.emailRepository.findById(emailKey);
    }

    async findAll(): Promise<Email[]> {
        return await this.emailRepository.findAll();
    }

    async deleteById(emailKey: number) {
        if (!emailKey) {
            throw new Error('Error: emailKey is null or undefined');
        }
        return await this.emailRepository.deleteById(emailKey);
    }
    
}