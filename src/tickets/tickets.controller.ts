import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { TicketsService } from './tickets.service';

@ApiTags('Tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @ApiOperation({
    summary: 'Créer un ticket',
    description: 'Crée un nouveau ticket à partir des données fournies.',
  })
  @ApiResponse({
    status: 201,
    description: 'Ticket créé avec succès.',
    type: Ticket,
  })
  @ApiResponse({
    status: 400,
    description: 'Données envoyées invalides.',
  })
  create(@Body() createTicketDto: CreateTicketDto): Promise<Ticket> {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Lister les tickets',
    description: 'Retourne la liste de tous les tickets actifs.',
  })
  @ApiResponse({
    status: 200,
    description: 'Liste des tickets récupérée avec succès.',
    type: [Ticket],
  })
  findAll(): Promise<Ticket[]> {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Récupérer un ticket',
    description: 'Retourne un ticket à partir de son identifiant.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Identifiant du ticket',
  })
  @ApiResponse({
    status: 200,
    description: 'Ticket trouvé.',
    type: Ticket,
  })
  @ApiResponse({
    status: 404,
    description: 'Ticket introuvable.',
  })
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Ticket> {
    return this.ticketsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Modifier un ticket',
    description: 'Modifie partiellement un ticket existant.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Identifiant du ticket',
  })
  @ApiResponse({
    status: 200,
    description: 'Ticket modifié avec succès.',
    type: Ticket,
  })
  @ApiResponse({
    status: 400,
    description: 'Données envoyées invalides.',
  })
  @ApiResponse({
    status: 404,
    description: 'Ticket introuvable.',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTicketDto: UpdateTicketDto,
  ): Promise<Ticket> {
    return this.ticketsService.update(id, updateTicketDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Supprimer logiquement un ticket',
    description:
      'Effectue un soft delete du ticket sans supprimer physiquement la ligne en base.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Identifiant du ticket',
  })
  @ApiResponse({
    status: 204,
    description: 'Ticket supprimé logiquement avec succès.',
  })
  @ApiResponse({
    status: 404,
    description: 'Ticket introuvable.',
  })
  async softRemove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.ticketsService.softRemove(id);
  }
}