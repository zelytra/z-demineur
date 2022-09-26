#! /bin/bash
exec git clone https://github.com/zelytra/z-demineur.git
exec npm install --prefix ./z-demineur/
exec npm install --prefix ./z-demineur/server/
