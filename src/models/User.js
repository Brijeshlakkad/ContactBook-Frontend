export class User {
    constructor(obj) {
        if (obj) {
            this.id = obj._id;
            this.name = obj.name;
            this.email = obj.email;
            this.password = obj.password;
        }
    }
}