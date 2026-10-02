# Installer les dépendances

Avec Node.js 20 ou supérieur, depuis le dossier `ticket-api` :

```sh
npm install
```

Le fichier `.env` est fourni localement. Après un clone, copier `.env.example` vers `.env`.

# Lancer PostgreSQL

Installer et démarrer Docker Desktop, puis :

```sh
docker compose up -d --wait
```

# Lancer NestJS

```sh
npm run start:dev
```

Le serveur écoute sur `http://localhost:3000`. Les routes renvoient une erreur 501 tant que leurs TODO ne sont pas complétés. Le schéma est créé automatiquement au lancement pour cet exercice local.

# Lancer le seed

PostgreSQL doit être démarré ; NestJS n’a pas besoin de tourner :

```sh
npm run seed
```

La commande crée le schéma et ajoute cinq tickets si la table est vide. Elle conserve les données existantes.

# Vérifier PostgreSQL

```sh
docker compose ps
docker compose exec postgres pg_isready -U postgres -d ticket_db
docker compose exec postgres psql -U postgres -d ticket_db -c "SELECT id, title, status, priority FROM tickets;"
```

La dernière commande s’utilise après le seed.
