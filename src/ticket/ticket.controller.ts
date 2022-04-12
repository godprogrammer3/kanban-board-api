import { TicketNotFoundErrorResponseDto } from './dto/response/ticket-not-found-error-response.dto';
import { BadRequestErrorResponseDto } from './dto/response/bad-request-error-response-dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/request/create-ticket.dto';
import { UpdateTicketDto } from './dto/request/update-ticket.dto';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TicketResponseDto } from './dto/response/creat-ticket-response.dto';
import { InternalServerErrorResponseDto } from './dto/response/internal-server-error-response-dto';
import { GetAllTicketDto } from './dto/request/get-all-ticket.dto';

@ApiTags('ticket')
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @ApiOperation({ summary: 'create ticket' })
  @ApiOkResponse({
    description: 'create ticket successfully',
    type: TicketResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'internal server error case',
    type: InternalServerErrorResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'bad request case',
    type: BadRequestErrorResponseDto,
  })
  @Post()
  create(@Body() createTicketDto: CreateTicketDto): Promise<TicketResponseDto> {
    return this.ticketService.create(createTicketDto);
  }

  @ApiOperation({ summary: 'get all ticket' })
  @ApiOkResponse({
    description: 'get all ticket successfully',
    type: [TicketResponseDto],
  })
  @ApiInternalServerErrorResponse({
    description: 'internal server error case',
    type: InternalServerErrorResponseDto,
  })
  @Get()
  async findAll(@Query() query: GetAllTicketDto): Promise<TicketResponseDto[]> {
    return this.ticketService.findAll(
      query.sortBy,
      query.sortType,
      query.filterStatus,
    );
  }

  @ApiOperation({ summary: 'get a ticket' })
  @ApiOkResponse({
    description: 'get ticket successfully',
    type: TicketResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'internal server error case',
    type: InternalServerErrorResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'ticket not found case',
    type: TicketNotFoundErrorResponseDto,
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TicketResponseDto> {
    return this.ticketService.findOne(id);
  }

  @ApiOperation({ summary: 'update a ticket' })
  @ApiOkResponse({
    description: 'update ticket successfully',
    type: TicketResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'internal server error case',
    type: InternalServerErrorResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'ticket not found case',
    type: TicketNotFoundErrorResponseDto,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ): Promise<TicketResponseDto> {
    return this.ticketService.update(id, updateTicketDto);
  }
}
