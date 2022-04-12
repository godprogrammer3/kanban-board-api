import { ApiProperty } from '@nestjs/swagger';
import { badRequestErrorResponseDtoExample } from '../examples/bad-request-error-response-dto.example';

export class BadRequestErrorResponseDto {
  @ApiProperty({
    description: 'http error status code',
    required: true,
    example: badRequestErrorResponseDtoExample.statusCode,
  })
  statusCode: number;

  @ApiProperty({
    description: 'array of error messages',
    required: true,
    example: badRequestErrorResponseDtoExample.message,
  })
  message: string[];

  @ApiProperty({
    description: 'summary error',
    required: true,
    example: badRequestErrorResponseDtoExample.error,
  })
  error: string;
}
