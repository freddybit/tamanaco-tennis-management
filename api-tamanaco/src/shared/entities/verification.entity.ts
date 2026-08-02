export class Verification {
    verificationKey: number;
    verificationDate: Date;
    player_profileKey: number;

    constructor(verificationKey: number, verificationDate: Date, player_profileKey: number) {
        this.verificationKey = verificationKey;
        this.verificationDate = verificationDate;
        this.player_profileKey = player_profileKey;
    }
}