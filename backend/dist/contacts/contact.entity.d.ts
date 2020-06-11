import { ObjectID } from 'typeorm';
export declare class Contact {
    id: ObjectID;
    firstName: string;
    lastName: string;
    numberType?: string;
    number?: Number;
    createdDate?: Date;
    modifiedDate?: Date;
    constructor(contact?: Partial<Contact>);
}
