#!bin/bash

if [ $# -eq 0 ]; then
  echo "No arguments provided"
  exit 1
fi

echo "$2 $1" | sudo tee -a /file.txt

