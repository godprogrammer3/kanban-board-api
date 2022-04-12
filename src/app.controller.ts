import { Controller, Get } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { AppService } from './app.service';
import { InternalServerErrorResponseDto } from './ticket/dto/response/internal-server-error-response-dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'check api' })
  @ApiOkResponse({
    description: 'This is Kanban board backend.',
    type: String,
  })
  @ApiInternalServerErrorResponse({
    description: 'internal server error case',
    type: InternalServerErrorResponseDto,
  })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
