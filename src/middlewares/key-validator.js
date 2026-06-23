import { envs } from "../config/envs.js";

export class RegisterKey {

    constructor(key) {
        this.Key = key.RegisterKey;
        this.ExpiresIn = key.ExpiresIn;
        this.CreatedAt = key.CreatedAt;
        this.ExpiresAt = key.ExpiresAt;
        this.Status = this.ValidateKey();
        this.Date = this.validateDate();
    }

    ValidateKey() {
        if (this.key !== envs.REGISTER_KEY){
            return false;
        }
        return true;
    }

    validateDate() {
        return true;
    }
}