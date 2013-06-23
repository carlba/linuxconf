#!/bin/bash
source $HOME/dotfiles/bashrc.d/global.sh

hosts="root@khan.d.birdstep.internal:/ root@testdms.stockholm.qa.birdstep.com:/ root@sprint.esa.birdstep.com:/ root@knight:/"

mount_path=~/sshfs



for host in ${hosts}
do   
  short_host=$(echo ${host} | awk -F'@|:' '{print $2}' | awk -F'.' '{print $1}')  
  hostname=$(echo ${host} | awk -F'@|:' '{print $2}')
  
  echo "Short Hostname: $short_host"
  echo "Hostname: $hostname"

  if [ $short_host = sprint ]
  then
    short_host=$(echo ${host} | awk -F'@' '{print $2}' | awk -F'.' '{print $1"."$2}')
  fi
  
    
 
  if isHostOnline $hostname; then
    full_path=$mount_path/$short_host
    echo "Full Path $full_path"
    if [[ ! -d "$full_path" ]]; then
      mkdir $full_path
    fi
    fusermount -uz $full_path 
    if [ "$1" != "-u" ]; then
      sshfs -o transform_symlinks $host $full_path
    fi
  fi
    

done


# unmount
#fusermount -u ~/far_projects





