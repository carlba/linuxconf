#!/bin/bash

#root_sync_path="/media/$(whoami)/DATA/backup"
root_sync_path="$HOME/Dropbox/transfer"
rsync_command="rsync -avd"

mkdir -p $root_sync_path/bsdev

if [[ "$#" -eq 0 ]]; then
  echo "No arguments provided"
  exit 1
fi

if [[ "$1" == "to" ]]; then
    $rsync_command $HOME/bsdev/gfk-http-collector $root_sync_path/bsdev --exclude venv
    $rsync_command $HOME/bsdev/analytics4 $root_sync_path/bsdev --exclude venv
    $rsync_command $HOME/.PyCharm50 $root_sync_path
fi

if [[ "$1" == "from" ]];then
    $rsync_command $root_sync_path/bsdev/gfk-http-collector $HOME/bsdev  --exclude venv
    $rsync_command $root_sync_path/bsdev/analytics4 $HOME/bsdev --exclude venv
    $rsync_command $root_sync_path/.PyCharm50 $HOME
fi
