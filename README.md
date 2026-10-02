# NestJS Ticket API

Petite API REST de gestion de tickets développée avec NestJS.

Le projet permet de manipuler des tickets via une API REST, avec persistance PostgreSQL, validation des données, documentation Swagger et exécution avec Docker.

## Stack

- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- Docker / Docker Compose
- Swagger
- class-validator

## Fonctionnalités

- création d’un ticket
- liste des tickets
- récupération d’un ticket par id
- modification partielle d’un ticket
- soft delete
- validation via DTO
- gestion des erreurs 404
- documentation Swagger

## Endpoints

| Méthode | Endpoint | Description |
|---|---|---|
| POST | `/tickets` | Créer un ticket |
| GET | `/tickets` | Récupérer tous les tickets |
| GET | `/tickets/:id` | Récupérer un ticket |
| PATCH | `/tickets/:id` | Modifier un ticket |
| DELETE | `/tickets/:id` | Soft delete d’un ticket |

## Installation

Avec Node.js 20 ou supérieur :

```bash
npm install
