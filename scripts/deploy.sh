#!/bin/sh
ssh lenin@159.65.157.53 <<EOF
 cd ~/jenkins-node-test
 git pull
 npm install — production
 pm2 restart all
 exit
EOF