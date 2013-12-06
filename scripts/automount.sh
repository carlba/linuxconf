#!/bin/bash
source $HOME/dotfiles/bashrc.d/global.sh

#hosts="root@khan.d.birdstep.internal:/ root@testdms.stockholm.qa.birdstep.com:/ root@sprint.esa.birdstep.com:/ root@knight:/ root@dms.birdstep.com:/ root@phaser.d.birdstep.internal:/ root@adm.auto.birdstep.com:/ root@riker.d.birdstep.internal:/ root@zulu.d.birdstep.internal:/ root@photon.d.birdstep.internal:/ root@sprint.esa.birdstep.com:/ root@host17.birdstep.com:/"

hosts="root@alpha.becmgr.com:/ root@khan.d.birdstep.internal:/ root@uhura.d.birdstep.internal:/ root@photon.d.birdstep.internal:/ root@testdms.stockholm.qa.birdstep.com:/ root@sprint.esa.birdstep.com:/ root@amon.d.birdstep.internal:/ tigger.d.birdstep.internal:/ root@sprint.adm.birdstep.com:/"

mount_path=~/sshfs

if [[ ! -d "$mount_path" ]]
then
  mkdir $mount_path
fi

sudo apt-get install sshfs



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
    if isHostRespodingOnPort $hostname 22; then
      full_path=$mount_path/$short_host
      echo "Full Path $full_path"
      if [[ ! -d "$full_path" ]]; then
        mkdir $full_path
      fi
      fusermount -uz $full_path
      rm -rf $full_path
      if [[ ! -d "$full_path" ]]; then
        mkdir $full_path
      fi
      if [ "$1" != "-u" ]; then
        sshfs -o transform_symlinks $host $full_path
      fi
    fi
  fi
done
