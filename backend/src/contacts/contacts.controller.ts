import { Controller, Get, Param, Post, Body, Put, Delete, HttpCode } from '@nestjs/common';
import { Contact } from './contact.entity';
import { ContactService } from './contacts.service'

@Controller('api/contacts')
export class ContactsController {
    constructor(
        private contactService: ContactService
    ) { }


    @Get()
    async getContacts(): Promise<Contact[]> {
        return await this.contactService.getContacts();
    }

    @Get(':id')
    async getContact(@Param('id') id): Promise<Contact> {
        return await this.contactService.getContact(id);
    }

    @Post()
    async createContact(@Body() contact: Partial<Contact>): Promise<Contact> {
        return await this.contactService.createContact(contact);
    }

    @Put(':id')
    @HttpCode(204)
    async updateContact(@Param('id') id, @Body() contact: Partial<Contact>): Promise<void> {
        return await this.contactService.updateContact(id, contact);
    }

    @Delete(':id')
    @HttpCode(204)
    async deleteContact(@Param('id') id): Promise<void> {
        return await this.contactService.deleteContact(id)
    }
}
