export class Contact {
    constructor(obj) {
        if (obj) {
            this.id = obj._id;
            this.firstName = obj.firstName;
            this.lastName = obj.lastName;
            this.email = obj.email;
            this.company = obj.company;
            this.phone = obj.phone;
        }
    }
}