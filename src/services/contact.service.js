import axios from "axios";
import { connectionUrls } from '../config';
import { Contact } from "../models/Contact";
import queryString from 'query-string';
const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}
export default class ContactService {

    async getContactList(userId) {
        let contactList = [];
        await axios.get(connectionUrls.contactUrl + "/" + userId, config).then(res => {
            res.data.map((data) => {
                contactList.push(new Contact(data));
            });

        });
        return contactList;
    }
    async addContact(userId, contactForm) {
        const { firstName, lastName, email, company, phone } = contactForm;
        let contact;
        await axios.post(connectionUrls.contactUrl, queryString.stringify({
            userId: userId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            company: company,
            phone: phone
        }), config).then(res => {
            contact = new Contact(res.data);
        });
        return contact;
    }
    async updateContact(contactForm) {
        const { id, firstName, lastName, email, company, phone } = contactForm;
        let contact;
        await axios.put(connectionUrls.contactUrl + "/" + id, queryString.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            company: company,
            phone: phone
        }), config).then(res => {
            contact = new Contact(res.data);
        });
        return contact;
    }
    async deleteContact(contactId) {
        let response;
        await axios.delete(connectionUrls.contactUrl + "/" + contactId, config).then(res => {
            response = res;
        });
        return response;
    }
}