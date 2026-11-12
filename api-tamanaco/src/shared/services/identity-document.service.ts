import { Injectable } from "@nestjs/common";
import { IdentityDocumentRepository } from "../repositories/identity-document.repository";
import { CreateIdentityDocumentDto } from "../dto/create-identity-document.dto";
import { IdentityDocument } from "../entities/identity-document.entity";
import { QueryRunner } from "typeorm";

@Injectable()
export class IdentityDocumentService {
    
    private readonly IdentityDocumentRepository: IdentityDocumentRepository;

    constructor(IdentityDocumentRepository: IdentityDocumentRepository) {
        this.IdentityDocumentRepository = IdentityDocumentRepository;
    }

    async create(document: CreateIdentityDocumentDto) {
        const newDocument = new IdentityDocument({
            type: document.type,
            docNumber: document.docNumber,
            Player_profileKey: document.Player_profileKey
        });
        return await this.IdentityDocumentRepository.create(newDocument);
    }

    async createWithRunner(queryRunner: QueryRunner, document: CreateIdentityDocumentDto) {
        const newDocument = new IdentityDocument({
            type: document.type,
            docNumber: document.docNumber,
            Player_profileKey: document.Player_profileKey
        });
        return await queryRunner.manager.save(IdentityDocument, newDocument);
    }


    async findById(identityDocumentKey: number) {
        if (!identityDocumentKey) {
            throw new Error('Error: identityDocumentKey is null or undefined');
        }
        return await this.IdentityDocumentRepository.findById(identityDocumentKey);
    }

    async findAll() {
        return await this.IdentityDocumentRepository.findAll();
    }

    async deleteById(identityDocumentKey: number) {
        if (!identityDocumentKey) {
            throw new Error('Error: identityDocumentKey is null or undefined');
        }
        return await this.IdentityDocumentRepository.deleteById(identityDocumentKey);
    }
}