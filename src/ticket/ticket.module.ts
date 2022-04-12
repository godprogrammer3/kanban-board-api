import { Ticket } from './entities/ticket.entity';
import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { FireormModule } from 'nestjs-fireorm';

@Module({
  imports: [FireormModule.forFeature([Ticket])],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
