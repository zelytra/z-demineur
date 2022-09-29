#! /bin/bash
eval sudo rm -r ./z-demineur
eval git clone https://github.com/zelytra/z-demineur.git

eval docker build . -t z-demineur-client
eval docker build ./server -t z-demineur-server

