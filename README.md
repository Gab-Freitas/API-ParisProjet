# Projet Web - Rénovation urbaines à Paris

 **Conception d'applications mobiles - ISMIN**  
Cours suivi par les étudiants de Mines Saint-Étienne, ISMIN – Master 2 Informatique.

Ce projet s’inscrit dans le cadre du cours de développement Web.  
L’objectif est de **développer une API REST avec NestJS** permettant de gérer et d’exposer des données issues d’un dataset Open Data.

## Prérequis
- [Node.js](https://nodejs.org/)
- Un gestionnaire de packages : `npm` ou `yarn`

---

## How to use :
   ```bash
    # Cloner le dépôt 
    $ git clone https://github.com/USERNAME/ParisProjet.git
    $ cd ParisProjet
   
    # Dépendances
    $ npm install
    
    # Lancer l'API en mode développement
    $ npm run start:dev
    
    # URL de l'API (à noter à partir de la port définie dans le main)
    # http://localhost:3000/paris
  ```
    
## 📚 Fonctionnalités de l’API
- GET /paris → Retourne la liste des projets de rénovation.
- GET /paris/:id → Retourne un projet précis.
- POST /paris → Ajoute un nouveau projet.
- POST /paris/search → Recherche de projets par mot-clé.
- PUT /paris/:id → Met à jour un projet existant.
- PATCH /paris/:id → Mise à jour partielle d’un projet.
- DELETE /paris/:id → Supprime un projet.

Les fonctionnalités ont été testé avec Postman.

## Choix de dévélopment
- Nous avons choisi d’inclure un booléen favori afin de spécifier un projet de rénovation donné.
- Un autre choix de développement concerne l’identifiant de chaque enregistrement (id), qui est défini aléatoirement à l’aide de la méthode [uuidv](https://www.uuidgenerator.net/version4).
- Le dataset choisi est ["Paris se transforme"](Paris se transforme), au format JSON, avec des catégories adaptées aux exigences du projet (Titre du descriptif, URL Photo, Coordonnées...).

## 📂 Structure du projet
```
ParisProjet/
 ├── src/
 │   ├── paris.controller.ts   # Définit les routes de l’API
 │   ├── paris.module.ts       # Module principal NestJS
 │   ├── paris.service.ts      # Contient la logique métier
 │   ├── Paris.ts              # Définition du modèle de données
 │   ├── dataset.json   
 │   ├── paris.service.spec.ts # Tests 
 │   └── main.ts
 ├── tsconfig.build.json
 ├── tsconfig.json
 └── ...
```

## Exemples de requêtes
### Récupérer tous les projets
```
  GET http://localhost:3000/paris
```

### Récupérer un projet par son ID
```
  GET http://localhost:3000/paris/9a1644c9-034b-47f6-b379-f95a15b1069b
```

### Ajouter un projet
```
  POST http://localhost:3000/paris
  Content-Type: application/json
  
  {
    "id": "9a1644c9-034b-47f6-b379-f95a15b1069b",
    "name": "Rénovation Place de la République",
    "description": "Travaux de modernisation"
  }
```

### Récupérer tous les projets
```
  POST http://localhost:3000/paris/search
  Content-Type: application/json
  
  {
    "query": "école"
  }
```

Équipe
- Gabriel Freitas
- Nícolas Botelho

  

  
