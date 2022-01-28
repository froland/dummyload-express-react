#!/bin/bash

yum install -y git tar
cat > /tmp/start_server.sh << EOF
cd /home/ec2-user

echo "Installing node.js"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
export NVM_DIR="/home/ec2-user/.nvm"
[ -s "\${NVM_DIR}/nvm.sh" ] && . "\${NVM_DIR}/nvm.sh"  # This loads nvm
nvm install --lts
nvm use --lts

echo "Installing server app"
git clone https://github.com/froland/dummyload-express-react.git
cd dummyload-express-react
npm build

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
