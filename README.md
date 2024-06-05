# WEB SERVICE  - Service dédié à l’authentification (Utilisation de OAuth et OpenID)

## Description du service

### Objectif
Développer un service d'authentification permettant aux utilisateurs de se connecter via OAuth et OpenID. Ce service sera chargé de vérifier les identifiants des utilisateurs et de générer des jetons d'accès sécurisés.

### Fonctionnalités principales
- **Intégration avec trois fournisseurs d'identité OAuth (comme Google, Discord, etc.).**
- **Utilisation de JWT pour sécuriser votre API.**
- **Implémentation des flux d'autorisation OAuth 2.0 et OpenID Connect.**
- **Sécurisation des communications et des données d'authentification.**
- **Interaction avec le service de gestion des opérations en base de données pour inscrire et connecter les utilisateurs.**

## Membres du projet
- **Lucas SEVAULT**
- **Aubin OLIVRIE**
- **Ryan PEYROT**

## Installation et configuration

1. Exécutez `npm install`.
2. Créez un fichier `.env` avec la configuration suivante :

```env
# GOOGLE
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URL=http://localhost:4001/auth/google/callback

# DISCORD
DISCORD_OAUTH_URL=https://discord.com/oauth2/authorize?client_id=<DISCORD_CLIENT_ID>&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A4001%2Fauth%2Fdiscord%2Fcallback&scope=identify+email
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=
DISCORD_REDIRECT_URL=http://localhost:4001/auth/discord/callback
DISCORD_TOKEN_URL=https://discord.com/api/oauth2/token
DISCORD_USER_URL=https://discord.com/api/users/@me

# GITHUB
GITHUB_OAUTH_URL=https://github.com/login/oauth/authorize?scope=read:user,user:email&client_id=<GITHUB_CLIENT_ID>&redirect_uri=http%3A%2F%2Flocalhost%3A4001%2Fauth%2Fgithub%2Fcallback
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_REDIRECT_URL=http://localhost:4001/auth/github/callback
GITHUB_TOKEN_URL=https://github.com/login/oauth/access_token
GITHUB_USER_URL=https://api.github.com/user

# URL de ce service OAuth
OAUTH_SERVICE_URL=http://localhost:4001  

# URL du front
FRONTEND_URL=http://localhost:3001 

# Configuration pour les requêtes au service de base de données
DATABASE_SERVICE_URL=http://localhost:3000

# Port sur lequel le service OAuth devrait écouter
PORT=4001

SESSION_SECRET=
```
## Lancement du projet
Exécutez npm start pour démarrer le serveur de développement.
