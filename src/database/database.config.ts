import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { Ticket } from '../tickets/entities/ticket.entity';

export function databaseOptions(config: ConfigService): DataSourceOptions {
  return {
    type: 'postgres',
    host: config.getOrThrow<string>('DB_HOST'),
    port: Number(config.getOrThrow<string>('DB_PORT')),
    username: config.getOrThrow<string>('DB_USERNAME'),
    password: config.getOrThrow<string>('DB_PASSWORD'),
    database: config.getOrThrow<string>('DB_DATABASE'),
    entities: [Ticket],
    // Création automatique du schéma pour cet exercice local uniquement.
    synchronize: true,
  };
}
