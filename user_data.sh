#!/bin/bash

yum install -y git tar
cd /home/ec2-user
git clone https://github.com/froland/dummyload-express-react.git
chown -R ec2-user:ec2-user /home/ec2-user/dummyload-express-react
su - ec2-user -c "/bin/bash /home/ec2-user/dummyload-express-react/install_app.sh"

cat > /home/ec2-user/dummyload-express-react

echo "Starting server app"
export NODE_ENV="production"
export DB_HOST="db"
export DB_PORT="5432"
export DB_USER="postgres"
export DB_PASSWORD="postgres"
export DB_DB="postgres"
export DB_DIALECT="postgres"
export PORT=3000
npm start
