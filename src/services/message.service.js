import { Subject } from 'rxjs';

const subject = new Subject();

export const messageService = {
    sendMessage: message => subject.next({ boolean: message }),
    clearMessages: () => subject.next(),
    getMessage: () => subject.asObservable()
};