#!/bin/bash

#root_sync_path="/media/$(whoami)/DATA/backup"

root_sync_path="$HOME/Dropbox/transfer"
rsync_command="rsync -ad --delete"


function rsync_from_home_to_syncpath {
    mkdir -p $(dirname "$root_sync_path/$1")
    echo -e "\nSyncing $HOME/$1/ with $root_sync_path/$1/"
    $rsync_command $HOME/$1/ $root_sync_path/$1/ --exclude venv
}

function rsync_from_syncpath_to_home {
    mkdir -p $(dirname "$HOME/$1")
    echo -e "\nSyncing $root_sync_path/$1/ with $HOME/$1/"
    $rsync_command "$root_sync_path/$1/" "$HOME/$1/" --exclude venv
}

mkdir -p $root_sync_path/bsdev

if [[ "$#" -eq 0 ]]; then
  echo "No arguments provided"
  exit 1
fi

if [[ "$1" == "to" ]]; then
    rsync_from_home_to_syncpath "bsdev/analytics4"
    rsync_from_home_to_syncpath "bsdev/gfk-http-collector"    
    rsync_from_home_to_syncpath ".PyCharm2016.1"
    rsync_from_home_to_syncpath ".gconf/apps/guake"
    rsync_from_home_to_syncpath ".config/doublecmd"
    rsync_from_home_to_syncpath ".config/kupfer"
    rsync_from_home_to_syncpath ".smartgit"
fi

if [[ "$1" == "from" ]];then
    rsync_from_syncpath_to_home "bsdev/analytics4"
    rsync_from_syncpath_to_home "bsdev/gfk-http-collector"    
    rsync_from_syncpath_to_home ".PyCharm2016.1"
    rsync_from_syncpath_to_home ".gconf/apps/guake"
    rsync_from_syncpath_to_home ".config/doublecmd/"
    rsync_from_syncpath_to_home ".config/kupfer"
    rsync_from_syncpath_to_home ".smartgit"
fi
