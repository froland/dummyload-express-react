#!/bin/bash

yum install -y git tar
cd /home/ec2-user
git clone https://github.com/froland/dummyload-express-react.git
chown -R ec2-user:ec2-user /home/ec2-user/dummyload-express-react
su - ec2-user -c "/bin/bash /home/ec2-user/dummyload-express-react/install_app.sh"

cat > /home/ec2-user/dummyload-express-react/.env <<EOF
# .env file
#
# Adapt to your execution environment.
#
DB_DB=dummyload
DB_DIALECT=postgres
DB_HOST=dummyload-db.cmeb8rjxmcu1.us-east-1.rds.amazonaws.com
DB_PASSWORD=SBdQoHz69BsBBWxxsARW
DB_PORT=5432
DB_USER=postgres
NODE_ENV=production
PORT=3000
EOF
chown ec2-user:ec2-user /home/ec2-user/dummyload-express-react/.env
chmod 0400 /home/ec2-user/dummyload-express-react/.env

su - ec2-user -c "/bin/bash /home/ec2-user/dummyload-express-react/start_app.sh"
