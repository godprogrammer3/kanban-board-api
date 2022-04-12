import { ApiProperty } from '@nestjs/swagger';
import { ticketNotfoundErrorResponseDtoExample } from '../examples/ticket-not-found-error-response.dto.example';

export class TicketNotFoundErrorResponseDto {
  @ApiProperty({
    description: 'http error status code',
    required: true,
    example: ticketNotfoundErrorResponseDtoExample.statusCode,
  })
  statusCode: number;

  @ApiProperty({
    description: 'error messages',
    required: true,
    example: ticketNotfoundErrorResponseDtoExample.message,
  })
  message: string[];

  @ApiProperty({
    description: 'summary error',
    required: true,
    example: ticketNotfoundErrorResponseDtoExample.error,
  })
  error: string;
}
