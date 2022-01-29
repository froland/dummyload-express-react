# Installation de l'application dans le cloud AWS

## Networking

-   Allouer une adresse IP élastique
-   Créer un VPC avec un subnet privé et un subnet public avec le wizard.
-   Créer un groupe de sécurité sg_web pour l'application server
-   Créer un groupe de sécurité sg_db pour l'accès DB depuis sg_web
-   Créer une DB RDS PostgreSQL :
    -   hostname : _généré par AWS_
    -   port : 5432
    -   dbname : dummyload
    -   username : postgres
    -   password : _généré par AWS_
-   Créer une instance EC2 à partir de l'AMI Amazon Linux 2
    -   user_data : copier user_data.sh et modifier les variables d'environnement
-   Arrêter l'instance et créer une AMI à partir de l'instance
