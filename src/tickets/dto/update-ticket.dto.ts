import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateIf,
} from 'class-validator';

import {
  ApiPropertyOptional,
} from '@nestjs/swagger';

import { TicketPriority } from '../enums/ticket-priority.enum';
import { TicketStatus } from '../enums/ticket-status.enum';

export class UpdateTicketDto {
  @ApiPropertyOptional({
    example: 'Problème imprimante',
    description: 'Nouveau titre du ticket',
    maxLength: 200,
  })
  @ValidateIf((_object, value) => value !== undefined)
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title?: string;

  @ApiPropertyOptional({
    example: 'L’imprimante ne répond plus depuis ce matin',
    description: 'Nouvelle description du ticket',
  })
  @ValidateIf((_object, value) => value !== undefined)
  @IsString()
  @IsNotEmpty()
  description?: string;

  @ApiPropertyOptional({
    enum: TicketPriority,
    example: TicketPriority.HIGH,
    description: 'Nouvelle priorité du ticket',
  })
  @ValidateIf((_object, value) => value !== undefined)
  @IsEnum(TicketPriority)
  priority?: TicketPriority;

  @ApiPropertyOptional({
    enum: TicketStatus,
    example: TicketStatus.IN_PROGRESS,
    description: 'Nouveau statut du ticket',
  })
  @ValidateIf((_object, value) => value !== undefined)
  @IsEnum(TicketStatus)
  status?: TicketStatus;
}