#!/bin/bash
NVM_VERSION=v0.39.1
NODE_VERSION=16
su - ec2-user curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/${NVM_VERSION}/install.sh | bash
su - ec2-user -c "git clone https://github.com/froland/dummyload-express-react.git"
su - ec2-user -c ". ~/.nvm/nvm.sh; nvm install ${NODE_VERSION}; nvm use ${NODE_VERSION}; cd dummyload-express-react; npm init; npm start"
