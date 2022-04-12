import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { TicketStatus } from 'src/ticket/entities/ticket.entity';
import { createTicketDtoExample } from '../examples/create-ticket.dto.example';
export enum SortBy {
  status = 'status',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

export enum SortType {
  asc = 'asc',
  desc = 'desc',
}

export class GetAllTicketDto {
  @ApiProperty({
    description: 'filter status of ticket',
    required: false,
    example: createTicketDtoExample.status,
  })
  @IsEnum(TicketStatus)
  @IsOptional()
  filterStatus?: TicketStatus;

  @ApiProperty({
    description: 'sort by',
    required: false,
    example: 'status | createdAt | updatedAt',
  })
  @IsEnum(SortBy)
  @IsOptional()
  sortBy?: SortBy;

  @ApiProperty({
    description: 'sort by',
    required: false,
    example: 'asc | desc',
  })
  @IsEnum(SortType)
  @IsOptional()
  sortType?: SortType;
}
