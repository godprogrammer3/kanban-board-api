import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TicketStatus } from '../../entities/ticket.entity';
import { createTicketDtoExample } from '../examples/create-ticket.dto.example';
export class UpdateTicketDto {
  @ApiProperty({
    description: 'title of ticket',
    required: false,
    example: createTicketDtoExample.title,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'description of ticket',
    required: false,
    example: createTicketDtoExample.description,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'status of ticket',
    required: false,
    example: createTicketDtoExample.status,
  })
  @IsEnum(TicketStatus)
  @IsOptional()
  status?: TicketStatus;

  @ApiProperty({
    description: 'contact of ticket',
    required: false,
    example: createTicketDtoExample.contact,
  })
  @IsString()
  @IsOptional()
  contact?: string;
}
