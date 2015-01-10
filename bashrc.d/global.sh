#!/bin/bash

function instr_file { 
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

function get_current_ip {
  #First param is the filter 
  ifconfig | grep "inet addr:$1"| grep -v "127.0.0.1" | cut -d: -f2 | awk '{ print $1}'
}

function is_host_online {
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

function is_host_respoding_on_port {
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

function close_gui_application {
  wmctrl -c "$1"
}

function ping_test {
  ping ping.birdstep.com
}

function command_exists {
	command -v $1 >/dev/null 2>&1
  if [[ $? == 0 ]]
	then
      [[ $- == *i* ]] && echo  Command ${1} does exist.
      return 0 # Note that zero means successful. It is the return value not a TRUE or FALSE value.
	else
      [[ $- == *i* ]] && echo Command ${1} does not exist.
      return 1	# Note that zero means successful. It is the return value not a TRUE or FALSE value.
	fi
}

clear_vim_swap() {  
  find $1 -mount -name "*~" -exec rm -rf {} \;
}
