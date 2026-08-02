export class IdentityDocument {
    docKey: number;
    type: string;
    docNumber: string;

    constructor(docKey: number, type: string, docNumber: string) {
        this.docKey = docKey;
        this.type = type;
        this.docNumber = docNumber;
    }
}