#!/bin/sh
function instrFile() { 
  local needle="$1" 
  local filepath="$2"
  if grep -q "$needle" $filepath; then
    return 0
  else
    return 1
  fi
}

function md5gen() {
  echo -n "$1" | md5sum
}