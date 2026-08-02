export class Place {
    placeKey: number;
    type: string;
    name: string;
    place_placeKey: number | null;

    constructor(placeKey: number, type: string, name: string, place_placeKey: number | null) {
        this.placeKey = placeKey;
        this.type = type;
        this.name = name;
        this.place_placeKey = place_placeKey;
    }
}