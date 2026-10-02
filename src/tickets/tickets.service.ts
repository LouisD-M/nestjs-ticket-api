import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { NotFoundException } from '@nestjs/common';
import { TicketPriority } from './enums/ticket-priority.enum';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketsRepository: Repository<Ticket>,
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const ticket = this.ticketsRepository.create(createTicketDto);
    return this.ticketsRepository.save(ticket);
  }

  async findAll(): Promise<Ticket[]> {
    const ticket = await this.ticketsRepository.find({

    })

    if (!ticket){
      throw new NotFoundException("Aucun ticket trouvé");
    }
    return ticket;
  }

  async findOne(id: number): Promise<Ticket> {
    const ticket = await this.ticketsRepository.findOne({
      where: {
        id: id,
      },
    }) 
    if (!ticket) {
      throw new NotFoundException("Aucun ticket trouvé");
    } 
      return ticket;
    
  }

  async update(id: number, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    const tickt = await this.findOne(id);
    this.ticketsRepository.merge(tickt, updateTicketDto);
    return this.ticketsRepository.save(tickt);
  }

  async softRemove(id: number): Promise<Ticket> {
    const ticket = await this.findOne(id);
    await this.ticketsRepository.softDelete(id);
    return ticket;
  }
}
