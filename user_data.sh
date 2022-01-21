#!/bin/bash
cat > /tmp/start_server.sh << EOF
echo "Installing node.js"
NVM_VERSION=v0.39.1
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/${NVM_VERSION}/install.sh | bash
. ~/.nvm/nvm.sh
nvm install --lts --latest-npm
nvm use --lts

echo "Installing server app"
git clone https://github.com/froland/dummyload-express-react.git
cd dummyload-express-react
npm init

echo "Starting server app"
export NODE_ENV="production"
export DB_HOST="db"
export DB_PORT="5432"
export DB_USER="postgres"
export DB_PASSWORD="postgres"
export DB_DB="postgres"
export DB_DIALECT="postgres"
npm start
EOF
chown ec2-user /tmp/start_server.sh
su - ec2-user -c "/bin/bash /tmp/start_server.sh"
