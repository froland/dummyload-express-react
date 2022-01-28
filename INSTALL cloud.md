# Installation de l'application dans le cloud AWS

## Networking

-   Allouer une adresse IP élastique
-   Créer un VPC avec un subnet privé et un subnet public avec le wizard.
-   Créer un groupe de sécurité sg_web pour l'application server
-   Créer un groupe de sécurité sg_db pour l'accès DB depuis sg_web
-   Créer une DB RDS PostgreSQL :
    -   hostname : dummyload-db.cmeb8rjxmcu1.us-east-1.rds.amazonaws.com
    -   port : 5432
    -   dbname : dummyload-db
    -   username : postgres
    -   password : zjYmpwEPuy9Z9U5K6Ga7
-   Créer une instance EC2 à partir de l'AMI Amazon Linux 2
-   Se connecter en SSH sur l'instance créée
    -   installer node.js
    -   cloner le repository git
    -   lancer `npm run build` pour télécharger les librairies
    -   installer `pm2` et s'assurer qu'il démarre bien au redémarrage de l'instance.
