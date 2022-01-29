#!/bin/bash

echo "Installing node.js"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
export NVM_DIR="/home/ec2-user/.nvm"
[ -s "\${NVM_DIR}/nvm.sh" ] && . "\${NVM_DIR}/nvm.sh"  # This loads nvm
nvm install --lts
nvm use --lts

cd /home/ec2-user/dummyload-express-react

npm run build
npm install -g pm2
cp .env.sample .env
