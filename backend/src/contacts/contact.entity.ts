import { Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('contacts')
export class Contact {
  @ObjectIdColumn() id: ObjectID;
  @Column() firstName: string;
  @Column() lastName: string;
  @Column() numberType?: string;
  @Column() number?: Number;
  @CreateDateColumn() createdDate?: Date;
  @UpdateDateColumn() modifiedDate?: Date;

  constructor(contact?: Partial<Contact>) {
    Object.assign(this, contact);
  }
}