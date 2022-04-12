import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TicketStatus } from '../../entities/ticket.entity';
import { createTicketDtoExample } from '../examples/create-ticket.dto.example';

export class CreateTicketDto {
  @ApiProperty({
    description: 'title of ticket',
    required: true,
    example: createTicketDtoExample.title,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'description of ticket',
    required: true,
    example: createTicketDtoExample.description,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'status of ticket',
    required: true,
    example: createTicketDtoExample.status,
  })
  @IsEnum(TicketStatus)
  @IsNotEmpty()
  status: TicketStatus;

  @ApiProperty({
    description: 'contact of ticket',
    required: true,
    example: createTicketDtoExample.contact,
  })
  @IsString()
  @IsNotEmpty()
  contact: string;
}
