export class Phone {
    phoneKey: number;
    areaCode: string;
    operatorCode: string;
    phoneNumber: string;

    constructor(phoneKey: number, areaCode: string, operatorCode: string, phoneNumber: string) {
        this.phoneKey = phoneKey;
        this.areaCode = areaCode;
        this.operatorCode = operatorCode;
        this.phoneNumber = phoneNumber;
    }
}
