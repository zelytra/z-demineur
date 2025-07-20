#!/bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

echo --- UPDATING CODE ---
if [ -d "./z-demineur" ]
then
    sudo rm -r $SCRIPT_DIR/z-demineur
fi
git clone https://github.com/zelytra/z-demineur.git

echo --- FRONTEND COMPILATION ---
pushd $SCRIPT_DIR/z-demineur/frontend > /dev/null
docker build . -t zelytra/z-demineur-frontend:latest --no-cache
docker push zelytra/z-demineur-frontend:latest

echo --- BACKEND COMPILATION ---
pushd $SCRIPT_DIR/z-demineur/backend > /dev/null
docker build . -t zelytra/z-demineur-backend:latest --no-cache
docker push zelytra/z-demineur-backend:latest

echo --- APP BUILD WITH SUCCESS ! ---