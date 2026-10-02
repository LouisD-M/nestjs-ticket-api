import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TicketPriority } from '../enums/ticket-priority.enum';

export class CreateTicketDto {
  @ApiProperty({
    example: 'Problème imprimante',
    description: 'Titre du ticket',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    example: 'Impossible d’imprimer depuis le poste 12',
    description: 'Description du problème',
  })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({
    enum: TicketPriority,
    example: TicketPriority.HIGH,
    description: 'Priorité du ticket',
  })
  @IsEnum(TicketPriority)
  priority?: TicketPriority;
}