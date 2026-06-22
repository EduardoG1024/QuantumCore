import { envs } from "../config/envs.js";

export class RegisterModel {

    constructor (email, password) {
        this.email = email;
        this.password = password;
        this.role = 'user';
        this.key = 'none';
        this.created_at = this.creationDate();
    }

    creationDate() {
        const date = new Date();
        return date;
    }
}

export class RegisterValidation {

    constructor(email, password) {
        this.email = email;
        this.password = password;
        this.status = this.ValidationData();
    }

    ValidationData() {
        if (!this.email.includes('@')){
            return false;
        }
        if (this.password.length < 8) {
            return false;
        }
        return true;
    }
}