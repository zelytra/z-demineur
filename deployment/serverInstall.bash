#! /bin/bash

if [ -d "./z-demineur" ]
then
    git -C ./z-demineur fetch --force
    git -C ./z-demineur rebase origin/master --force
else
    git clone https://github.com/zelytra/z-demineur.git
fi

echo --- CLIENT COMPILATION ---
docker build ./z-demineur/ -t z-demineur-client

echo --- SERVER COMPILATION ---
docker build ./z-demineur/server -t z-demineur-server

echo --- STARTING SERVICES ---
docker-compose -f ./z-demineur/docker-compose.yml up