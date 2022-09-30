#! /bin/bash

if [ -d "./z-demineur" ]
then
    eval git -C ./z-demineur fetch --force
    eval git -C ./z-demineur rebase origin/master --force
else
    eval git clone https://github.com/zelytra/z-demineur.git
fi

echo --- CLIENT COMPILATION ---
eval docker build ./z-demineur/ -t z-demineur-client

echo --- SERVER COMPILATION ---
eval docker build ./z-demineur/server -t z-demineur-server

echo --- STARTING SERVICES ---
eval docker-compose -f ./z-demineur/docker-compose.yml up