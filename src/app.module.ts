import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketModule } from './ticket/ticket.module';
import { FireormModule } from 'nestjs-fireorm';
import { credential } from 'firebase-admin';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TicketModule,
    FireormModule.forRoot({
      firestoreSettings: {
        projectId: process.env.FIREBASE_PROJECT_ID,
        credential: credential.applicationDefault(),
      },
      fireormSettings: {
        validateModels: true,
        validatorOptions: {
          skipUndefinedProperties: true,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
