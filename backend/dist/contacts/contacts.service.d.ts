import { MongoRepository } from 'typeorm';
import { Contact } from './contact.entity';
export declare class ContactService {
    private readonly contactRepository;
    constructor(contactRepository: MongoRepository<Contact>);
    getContacts(): Promise<Contact[]>;
    getContact(id: any): Promise<Contact>;
    createContact(contact: Partial<Contact>): Promise<Contact>;
    updateContact(id: any, contact: Partial<Contact>): Promise<void>;
    deleteContact(id: any): Promise<void>;
}
