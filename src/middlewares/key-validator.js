import { envs } from "../config/envs.js";

export class RegisterKey {

    constructor(key) {
        this.key = key;
        this.statustatus = this.ValidateKey();
    }

    ValidateKey() {
        if (this.key !== envs.REGISTER_KEY){
            return false;
        }
        return true;
    }
}