#!/usr/bin/env bash

main() {
  echo "Building Image"
  IMAGE_ID=$(docker build . -q)

  echo "Starting Container"
  CONTAINER_ID=$(docker run -d -it $IMAGE_ID bash)

  echo "Copying node_modules into node_modules"
  docker cp $CONTAINER_ID:/var/task/node_modules ./convert-with-heic/nodejs/

  echo "Copying vendor into vendor"
  docker cp $CONTAINER_ID:/var/task/vendor/bin ./convert-with-heic
  docker cp $CONTAINER_ID:/var/task/vendor/lib ./convert-with-heic

  echo "Removing container"
  docker kill $CONTAINER_ID
  docker rm $CONTAINER_ID
}

main