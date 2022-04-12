import { ApiProperty } from '@nestjs/swagger';
import { internalServerErrorResponseDtoExample } from '../examples/internal-server-error-response-dto.example';

export class InternalServerErrorResponseDto {
  @ApiProperty({
    description: 'http error status code',
    required: true,
    example: internalServerErrorResponseDtoExample.statusCode,
  })
  statusCode: number;

  @ApiProperty({
    description: 'error message',
    required: true,
    example: internalServerErrorResponseDtoExample.message,
  })
  message: string;
}
