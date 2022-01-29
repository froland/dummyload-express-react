#!/bin/bash

echo "## Installing node.js"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
export NVM_DIR="/home/ec2-user/.nvm"
. "${NVM_DIR}/nvm.sh"
nvm install --lts
nvm use --lts
nvm install-latest-npm

echo "## Building dummyload-express-react"
cd /home/ec2-user/dummyload-express-react
npm run build

echo "## Installing PM2 process manager"
npm install -g pm2
pm2 startup
sudo env PATH=$PATH:/home/ec2-user/.nvm/versions/node/v16.13.2/bin /home/ec2-user/.nvm/versions/node/v16.13.2/lib/node_modules/pm2/bin/pm2 startup systemd -u ec2-user --hp /home/ec2-user
sudo systemctl start pm2-ec2-user
