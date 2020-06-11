import { Param, Body,  BadRequestException, NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID } from 'mongodb';
import { MongoRepository } from 'typeorm';
import { Contact } from './contact.entity';

@Injectable()
export class ContactService {
    constructor(
        @InjectRepository(Contact)
        private readonly contactRepository: MongoRepository<Contact>,
    ) { }

    async getContacts(): Promise<Contact[]> {
    return await this.contactRepository.find();
  }

  async getContact(@Param('id') id): Promise<Contact> {
    const contact = ObjectID.isValid(id) && await this.contactRepository.findOne(id);
    if (!contact) {
        throw new NotFoundException('Contact is not found');
    }
    return contact;
}

async createContact(@Body() contact: Partial<Contact>): Promise<Contact> {
    if (!contact || !contact.firstName || !contact.lastName) {
        throw new BadRequestException(`All fields need to filled.`);
    }
    return await this.contactRepository.save(new Contact(contact));
}

async updateContact(@Param('id') id, @Body() contact: Partial<Contact>): Promise<void> {
    // Check if entity exists
    const exists = ObjectID.isValid(id) && await this.contactRepository.findOne(id);
    if (!exists) {
        throw new NotFoundException('Contact is not found');
    }
    await this.contactRepository.update(id, contact);
    
}

async deleteContact(@Param('id') id): Promise<void> {
    // Check if entity exists
    const exists = ObjectID.isValid(id) && await this.contactRepository.findOne(id);
    if (!exists) {
        throw new NotFoundException('Contact is not found');
    }
    await this.contactRepository.delete(id);
}
}