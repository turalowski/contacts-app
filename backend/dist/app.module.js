"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const contacts_controller_1 = require("./contacts/contacts.controller");
const typeorm_1 = require("@nestjs/typeorm");
const contact_entity_1 = require("./contacts/contact.entity");
const contacts_service_1 = require("./contacts/contacts.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forRoot({
                type: 'mongodb',
                url: 'mongodb+srv://admin:Az123456@cluster0-i7quy.mongodb.net/contacts-app',
                database: 'contact-list',
                entities: [
                    __dirname + '/**/*.entity{.ts,.js}',
                ],
                ssl: true,
                useUnifiedTopology: true,
                useNewUrlParser: true
            }), typeorm_1.TypeOrmModule.forFeature([contact_entity_1.Contact])],
        controllers: [app_controller_1.AppController, contacts_controller_1.ContactsController],
        providers: [app_service_1.AppService, contacts_service_1.ContactService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map