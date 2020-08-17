#!/bin/bash

# pushd vue-app
# yarn install
# yarn build
# popd

pushd react-app
yarn install
yarn build
popd


# docker build -t trwfff/parking-artisan .
# docker push trwfff/parking-artisan
# docker run --rm -it -p4000:4000 --init trwfff/parking-artisan
# docker run --rm -it -p4000:4000 trwfff/parking-artisan