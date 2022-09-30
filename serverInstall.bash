#! /bin/bash
eval sudo rm -r ./z-demineur
eval git clone https://github.com/zelytra/z-demineur.git

eval docker build ./z-demineur/ -t z-demineur-client
eval docker build ./z-demineur/server -t z-demineur-server

eval docker-compose -f ./z-demineur/docker-compose.yml upocker