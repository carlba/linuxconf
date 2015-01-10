#!/bin/bash

. ~/dotfiles/bashrc.d/global.sh

hostsfile=~/scripts/hosts
green='\e[0;32m' # '\e[1;32m' is too bright for white bg.
red='\e[1;31m'
endColor='\e[0m'


for host in $(cat ${hostsfile})
do
  if is_host_online $host; then
    echo -e "${green}${host}${endColor}"
  else    
    echo -e "${red}$host${endColor}"
  fi
done

#$(ping ping.birdstep.com | egrep -o '([1-9]{1,3}\.){3}[1-9]{1,3}')$
