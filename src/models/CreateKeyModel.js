import { envs } from "../config/envs.js";

export class CreateRegisterKey {

    constructor() {
        this.RegisterKey = envs.REGISTER_KEY;
        this.ExpiresIn = 10;
        this.CreatedAt = new Date();
        this.ExpiresAt = new Date(this.CreatedAt);
        this.ExpiresAt.setMinutes(this.ExpiresAt.getMinutes() + this.ExpiresIn);
    }

}