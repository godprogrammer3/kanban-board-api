import { Ticket, TicketStatus } from './entities/ticket.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from 'nestjs-fireorm';
import { CreateTicketDto } from './dto/request/create-ticket.dto';
import { UpdateTicketDto } from './dto/request/update-ticket.dto';
import { BaseFirestoreRepository, IQueryBuilder } from 'fireorm';
import firestore from '@google-cloud/firestore';
import { TicketResponseDto } from './dto/response/creat-ticket-response.dto';
import { firebaseTimeStampToUtcString } from 'src/utils/helper';
import { ErrorNotFondException } from 'src/utils/constant';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private tickets: BaseFirestoreRepository<Ticket>,
  ) {}
  async create(createTicketDto: CreateTicketDto): Promise<TicketResponseDto> {
    const newTicket = createTicketDto as Ticket;
    newTicket.createdAt = firestore.Timestamp.now();
    newTicket.updatedAt = firestore.Timestamp.now();
    const createdTicket = await this.tickets.create(newTicket);

    return {
      ...createdTicket,
      createdAt: firebaseTimeStampToUtcString(createdTicket.createdAt),
      updatedAt: firebaseTimeStampToUtcString(createdTicket.updatedAt),
    };
  }

  async findAll(
    sortBy?: string,
    sortType?: string,
    filterStatus?: TicketStatus,
  ): Promise<TicketResponseDto[]> {
    let query: IQueryBuilder<Ticket>;
    if (filterStatus) {
      query = this.tickets.whereEqualTo(
        (ticket) => ticket.status,
        filterStatus,
      );
    }
    if (sortBy && sortBy !== 'status') {
      if (sortType == 'desc') {
        query = query.orderByDescending((ticket) => ticket[sortBy]);
      } else {
        query = query.orderByAscending((ticket) => ticket[sortBy]);
      }
    }
    const resultTickets = (
      query ? await query.find() : await this.tickets.find()
    ).map((ticket) => ticket as unknown as TicketResponseDto);
    if (sortBy == 'status' && sortType == 'desc') {
      return [
        ...resultTickets.filter(
          (ticket) => ticket.status == TicketStatus.REJECTED,
        ),
        ...resultTickets.filter(
          (ticket) => ticket.status == TicketStatus.RESOLVED,
        ),
        ...resultTickets.filter(
          (ticket) => ticket.status == TicketStatus.ACCEPTED,
        ),
        ...resultTickets.filter(
          (ticket) => ticket.status == TicketStatus.PENDING,
        ),
      ];
    } else if (sortBy == 'status') {
      return [
        ...resultTickets.filter(
          (ticket) => ticket.status == TicketStatus.PENDING,
        ),
        ...resultTickets.filter(
          (ticket) => ticket.status == TicketStatus.ACCEPTED,
        ),
        ...resultTickets.filter(
          (ticket) => ticket.status == TicketStatus.RESOLVED,
        ),
        ...resultTickets.filter(
          (ticket) => ticket.status == TicketStatus.REJECTED,
        ),
      ];
    } else {
      return resultTickets;
    }
  }

  async findOne(id: string): Promise<TicketResponseDto> {
    const ticket = (await this.tickets.findById(
      id,
    )) as unknown as TicketResponseDto;
    if (!ticket) {
      throw ErrorNotFondException;
    } else {
      return ticket;
    }
  }

  async update(
    id: string,
    updateTicketDto: UpdateTicketDto,
  ): Promise<TicketResponseDto> {
    try {
      (await this.tickets.update({
        id,
        ...(updateTicketDto as Ticket),
        updatedAt: firestore.Timestamp.now(),
      })) as unknown as TicketResponseDto;
      return await this.findOne(id);
    } catch (error) {
      if (error.message.includes('NOT_FOUND')) {
        throw ErrorNotFondException;
      } else {
        throw error;
      }
    }
  }
}
