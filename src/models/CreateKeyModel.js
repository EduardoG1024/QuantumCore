import { Uuid } from "../config/uuid.adapter.js";

const KeyRegistered = [];

export class CreateRegisterKey {

    constructor() {
        this.RegisterKey = Uuid();
        this.ExpiresIn = 10;
        this.CreatedAt = new Date();
        this.ExpiresAt = new Date(this.CreatedAt);
        this.ExpiresAt.setMinutes(this.ExpiresAt.getMinutes() + this.ExpiresIn);
    }

}

const key = new CreateRegisterKey();
KeyRegistered.push(key);
console.log(KeyRegistered);

export class ValidateRegisterKey {

    constructor(key) {
        this.uuid = key.RegisterKey;
        this.validation = this.ValidationDate();
    }

    ValidationDate() {
        const date = new Date();
        if (date >= key.CreatedAt && date <= key.ExpiresAt) {
            console.log('Codigo Aun Valido');
        } else {
            console.log('Codigo Expiró, Crea uno Nuevo');
        }
        return true;
    }
}