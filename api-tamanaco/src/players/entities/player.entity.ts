export class Player {
    profileKey: number;
    firstName: string;
    secondName: string | null;
    firstLastname: string;
    secondLastname: string | null;
    birthDate: Date | null;
    sex: string;
    photoOne: string | null;
    photoTwo: string | null;

    constructor(profileKey: number,firstName: string,secondName: string,firstLastname: string,secondLastname: string,birthDate: Date,sex: string,photoOne: string,photoTwo: string) {
        this.profileKey = profileKey;
        this.firstName = firstName;
        this.secondName = secondName;
        this.firstLastname = firstLastname;
        this.secondLastname = secondLastname;
        this.birthDate = birthDate;
        this.sex = sex;
        this.photoOne = photoOne;
        this.photoTwo = photoTwo;
    }
    
}
