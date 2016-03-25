#!/bin/bash

vagrant_host=burken
user=genzo

vagrants=($(ssh $user@$vagrant_host -C "find \$HOME/vagrant/* -type d -maxdepth 0"))

for vagrant in $vagrants
do
  ip_address=$(ssh $user@$vagrant_host -C "cd $vagrant; vagrant ssh -c \"hostname -I\"" | awk '{print $2}')
  hostname=$(basename $vagrant)
  $HOME/scripts/add_host.sh $hostname.vagrant.dev $ip_address > /dev/null
  ssh-keygen -f "/home/cada/.ssh/known_hosts" -R $hostname.vagrant.dev >/dev/null
  ssh-keyscan -H $hostname.vagrant.dev >> ~/.ssh/known_hosts 2>/dev/null
  sudo python remove_duplicates.py -o /etc/hosts /etc/hosts
done

