"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const mongodb_1 = require("mongodb");
const typeorm_2 = require("typeorm");
const contact_entity_1 = require("./contact.entity");
let ContactService = class ContactService {
    constructor(contactRepository) {
        this.contactRepository = contactRepository;
    }
    async getContacts() {
        return await this.contactRepository.find();
    }
    async getContact(id) {
        const contact = mongodb_1.ObjectID.isValid(id) && await this.contactRepository.findOne(id);
        if (!contact) {
            throw new common_1.NotFoundException('Contact is not found');
        }
        return contact;
    }
    async createContact(contact) {
        if (!contact || !contact.firstName || !contact.lastName) {
            throw new common_1.BadRequestException(`All fields need to filled.`);
        }
        return await this.contactRepository.save(new contact_entity_1.Contact(contact));
    }
    async updateContact(id, contact) {
        const exists = mongodb_1.ObjectID.isValid(id) && await this.contactRepository.findOne(id);
        if (!exists) {
            throw new common_1.NotFoundException('Contact is not found');
        }
        await this.contactRepository.update(id, contact);
    }
    async deleteContact(id) {
        const exists = mongodb_1.ObjectID.isValid(id) && await this.contactRepository.findOne(id);
        if (!exists) {
            throw new common_1.NotFoundException('Contact is not found');
        }
        await this.contactRepository.delete(id);
    }
};
__decorate([
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContactService.prototype, "getContact", null);
__decorate([
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContactService.prototype, "createContact", null);
__decorate([
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ContactService.prototype, "updateContact", null);
__decorate([
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContactService.prototype, "deleteContact", null);
ContactService = __decorate([
    common_2.Injectable(),
    __param(0, typeorm_1.InjectRepository(contact_entity_1.Contact)),
    __metadata("design:paramtypes", [typeorm_2.MongoRepository])
], ContactService);
exports.ContactService = ContactService;
//# sourceMappingURL=contacts.service.js.map