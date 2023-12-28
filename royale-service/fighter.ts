import {Weapon} from './weapons'

class Fighter {
    hp = 50;
    weapon: Weapon | null = null;
    inventory = [];
    name = "";
    id="";
    constructor (name: string,id: string) {
        this.name = name;
        this.id = id;
    }
}

export default Fighter;