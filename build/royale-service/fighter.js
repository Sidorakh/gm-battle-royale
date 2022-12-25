"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Fighter {
    constructor(name, id) {
        this.hp = 50;
        this.weapon = null;
        this.inventory = [];
        this.name = "";
        this.id = "";
        this.name = name;
        this.id = id;
    }
}
exports.default = Fighter;
