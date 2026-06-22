
export class RegisterKey {

    constructor(key) {
        this.key = key;
        this.status = this.ValidateKey();
    }

    ValidateKey() {
        if (this.key !== envs.REGISTER_KEY){
            return false;
        }
        return true;
    }

    validateDate() {
        
    }
}