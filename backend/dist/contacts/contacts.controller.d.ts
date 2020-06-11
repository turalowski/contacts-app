import { Contact } from './contact.entity';
import { ContactService } from './contacts.service';
export declare class ContactsController {
    private contactService;
    constructor(contactService: ContactService);
    getContacts(): Promise<Contact[]>;
    getContact(id: any): Promise<Contact>;
    createContact(contact: Partial<Contact>): Promise<Contact>;
    updateContact(id: any, contact: Partial<Contact>): Promise<void>;
    deleteContact(id: any): Promise<void>;
}
