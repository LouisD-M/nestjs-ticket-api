import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { AppModule } from '../app.module';
import { Ticket } from '../tickets/entities/ticket.entity';
import { TicketPriority } from '../tickets/enums/ticket-priority.enum';
import { TicketStatus } from '../tickets/enums/ticket-status.enum';

async function seed(): Promise<void> {
  const app = await NestFactory.createApplicationContext(AppModule);
  try {
    const repository = app.get(DataSource).getRepository(Ticket);
    if (await repository.count() > 0) {
      console.log('La table contient déjà des tickets : seed ignoré.');
      return;
    }

    await repository.insert([
      { title: 'Impossible de se connecter', description: 'La connexion au portail échoue.', status: TicketStatus.OPEN, priority: TicketPriority.HIGH },
      { title: 'Erreur imprimante', description: 'Les documents restent dans la file d’attente.', status: TicketStatus.IN_PROGRESS, priority: TicketPriority.MEDIUM },
      { title: 'Accès refusé au dossier partagé', description: 'Le dossier de l’équipe est inaccessible.', status: TicketStatus.OPEN, priority: TicketPriority.HIGH },
      { title: 'Poste très lent', description: 'Les applications mettent plusieurs minutes à démarrer.', status: TicketStatus.IN_PROGRESS, priority: TicketPriority.LOW },
      { title: 'Écran secondaire non détecté', description: 'Le deuxième écran ne reçoit aucun signal.', status: TicketStatus.CLOSED, priority: TicketPriority.MEDIUM },
    ]);
    console.log('5 tickets d’exemple ajoutés.');
  } finally {
    await app.close();
  }
}

seed().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
