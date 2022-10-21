#!/bin/bash

# codigo para actualizar el repositorio de github
#git config --global credential.helper store
git init
git add .
git commit -am "$1"
git remote add http://github.com/friki57/telemedicina.git
git push origin master -f
