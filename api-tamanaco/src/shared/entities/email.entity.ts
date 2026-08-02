export class Email {
    emailKey: number;
    username: string;
    atSymbol: string = '@';
    domainName: string;

    constructor(emailKey: number, username: string, domainName: string) {
        this.emailKey = emailKey;
        this.username = username;
        this.domainName = domainName;
    }
}