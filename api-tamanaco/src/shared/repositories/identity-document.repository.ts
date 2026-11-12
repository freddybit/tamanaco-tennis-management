import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository, TypeOrmModule } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IdentityDocument } from "../entities/identity-document.entity";

@Injectable()
export class IdentityDocumentRepository {

    private typeOrmRepository: Repository<IdentityDocument>;

    constructor(
        @InjectRepository(IdentityDocument)
        typeOrmRepository: Repository<IdentityDocument>
    ) {
        this.typeOrmRepository = typeOrmRepository;
    }

    async create(document: IdentityDocument) {
        const newDoc = this.typeOrmRepository.create(document);
        await this.typeOrmRepository.save(newDoc);
    }
    
    async findById(docKey: number): Promise<IdentityDocument | null> {
        return await this.typeOrmRepository.findOne({
            where: { docKey },
            relations: { 
                player: true
            }
        });
    }

    async findAll(): Promise<IdentityDocument[]> {
        return await this.typeOrmRepository.find()
    }

    async update(updateDocument: IdentityDocument) {
        await this.typeOrmRepository.update(
            { docKey: updateDocument.docKey },
            {
                type: updateDocument.type,
                docNumber: updateDocument.docNumber,
            }
        );
    }

    async deleteById(docKey: number) {
        await this.typeOrmRepository.delete(
            { docKey }
        );
    }

}
