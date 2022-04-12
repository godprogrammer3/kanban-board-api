import { ApiProperty } from '@nestjs/swagger';
import { TicketStatus } from '../../entities/ticket.entity';
import { ticketResponseDtoExample } from '../examples/ticket-response.dto.example';

export class TicketResponseDto {
  @ApiProperty({
    description: 'title of ticket',
    required: true,
    example: ticketResponseDtoExample.title,
  })
  title: string;

  @ApiProperty({
    description: 'description of ticket',
    required: true,
    example: ticketResponseDtoExample.description,
  })
  description: string;

  @ApiProperty({
    description: 'status of ticket',
    required: true,
    example: ticketResponseDtoExample.status,
  })
  status: TicketStatus;

  @ApiProperty({
    description: 'contact of ticket',
    required: true,
    example: ticketResponseDtoExample.contact,
  })
  contact: string;

  @ApiProperty({
    description: 'created time of ticket',
    required: true,
    example: ticketResponseDtoExample.createdAt,
  })
  createdAt: string;

  @ApiProperty({
    description: 'updated time of ticket',
    required: true,
    example: ticketResponseDtoExample.updatedAt,
  })
  updatedAt: string;
}
