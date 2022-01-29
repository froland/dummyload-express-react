#!/bin/bash

cd /home/ec2-user/dummyload-express-react
pm2 start bin/www --name dummyload-express-react
pm2 save
