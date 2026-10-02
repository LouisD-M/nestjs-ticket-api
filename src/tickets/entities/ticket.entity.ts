import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

import { TicketPriority } from '../enums/ticket-priority.enum';
import { TicketStatus } from '../enums/ticket-status.enum';

@Entity('tickets')
export class Ticket {
  @ApiProperty({
    example: 1,
    description: 'Identifiant unique du ticket',
  })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({
    example: 'Problème imprimante',
    description: 'Titre du ticket',
    maxLength: 200,
  })
  @Column({
    type: 'varchar',
    length: 200,
  })
  title!: string;

  @ApiProperty({
    example: 'L’imprimante du bureau ne répond plus',
    description: 'Description du problème',
  })
  @Column({
    type: 'text',
  })
  description!: string;

  @ApiProperty({
    enum: TicketStatus,
    example: TicketStatus.OPEN,
    description: 'Statut actuel du ticket',
  })
  @Column({
    type: 'enum',
    enum: TicketStatus,
    default: TicketStatus.OPEN,
  })
  status!: TicketStatus;

  @ApiProperty({
    enum: TicketPriority,
    example: TicketPriority.MEDIUM,
    description: 'Priorité du ticket',
  })
  @Column({
    type: 'enum',
    enum: TicketPriority,
    default: TicketPriority.MEDIUM,
  })
  priority!: TicketPriority;

  @ApiProperty({
    example: '2026-10-02T14:00:00.000Z',
    description: 'Date de création du ticket',
  })
  @CreateDateColumn({
    type: 'timestamptz',
  })
  createdAt!: Date;

  @ApiProperty({
    example: '2026-10-02T15:30:00.000Z',
    description: 'Date de dernière modification du ticket',
  })
  @UpdateDateColumn({
    type: 'timestamptz',
  })
  updatedAt!: Date;

  @ApiPropertyOptional({
    example: '2026-10-02T16:00:00.000Z',
    description: 'Date du soft delete',
    nullable: true,
  })
  @DeleteDateColumn({
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt!: Date | null;
}