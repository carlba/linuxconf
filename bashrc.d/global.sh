#!/bin/bash

function instrFile { 
  local needle="$1" 
  local filepath="$2"
  if grep -q "$needle" $filepath; then
    return 0
  else
    return 1
  fi
}

function md5gen {
  echo -n "$1" | md5sum
}

function getCurrentIP {
  ifconfig | grep 'inet addr:'| grep -v '127.0.0.1' | cut -d: -f2 | awk '{ print $1}'
}

function isHostOnline {
	ping ${1} -c 1 &> /dev/null
	if [[ $? == 0 ]]
	then
      [[ $- == *i* ]] && echo Host ${1} is online.
      return 0 # Note that zero means successful. It is the return value not a TRUE or FALSE value.
	else
      [[ $- == *i* ]] && echo Host ${1} is offline.
      return 1	# Note that zero means successful. It is the return value not a TRUE or FALSE value.
	fi
}

function isHostRespodingOnPort {
  nc -z -w 3 $1 $2 &> /dev/null
  if [[ $? == 0 ]]
  then
      [[ $- == *i* ]] && echo Host ${1} is responding on port $2.
      return 0 # Note that zero means successful. It is the return value not a TRUE or FALSE value.
  else
      [[ $- == *i* ]] && echo Host ${1} is NOT responding on port $2.
      return 1  # Note that zero means successful. It is the return value not a TRUE or FALSE value.
  fi
}

function closeGuiApplication {
  wmctrl -c "$1"
}

function pingTest {
  ping ping.birdstep.com
}
