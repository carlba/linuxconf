#!/bin/bash

for var in "$@"
do
  rp=$(realpath "$var")
  filename=$(basename "$rp")
  extension="${filename##*.}"
  filename="${filename%.*}"
  sudo ln -s "$rp" "/usr/local/bin/$filename" 
done
