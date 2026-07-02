import { envs } from "../config/envs.js";

export class RegisterModel {

    constructor (username, password) {
        this.username = username;
        this.password = password;
        this.role = 'user';
        this.key = 'none';
        this.group = 'none';
        this.created_at = this.creationDate();
    }

    creationDate() {
        const date = new Date();
        return date;
    }
}

const symbols = ['!', '¡', '#', '$', '%', '&', '/', '(', ')', '=', '?', '¿', '*', '|', '{', '}', '[', ']', '.', ',', ';', ':', '_', '-', '@'];
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

export class RegisterValidation {

    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.status = this.ValidationData();
    }

    ValidationData() {
        if (this.username.includes(symbols)) return false;
        if (this.username.includes(numbers)) return false;
        if (this.password.length < 8) return false;

        return true;
    }
}