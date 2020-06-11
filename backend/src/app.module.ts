import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsController } from './contacts/contacts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';


// Contact 
import { Contact } from './contacts/contact.entity'
import {ContactService} from './contacts/contacts.service'

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mongodb',
    url: 'mongodb+srv://admin:Az123456@cluster0-i7quy.mongodb.net/contacts-app',
    database: 'contact-list',
    entities: [
      __dirname + '/**/*.entity{.ts,.js}',
    ],
    ssl: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
  }), TypeOrmModule.forFeature([Contact])],
  controllers: [AppController, ContactsController],
  providers: [AppService, ContactService],
})
export class AppModule { }
