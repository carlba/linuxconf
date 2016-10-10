#!/bin/bash

root_sync_path="$HOME/Dropbox/transfer"
rsync_command="rsync -ad --delete"

if [[ "$#" -eq 0 ]]; then
  echo "No arguments provided"
  exit 1
fi

function rsync_from_home_to_syncpath {
    mkdir -p $(dirname "$root_sync_path/$1")
    echo -e "\nSyncing $HOME/$1/ with $root_sync_path/$1/"
    ${rsync_command} $HOME/$1/ ${root_sync_path}/$1/ --exclude venv
}

function rsync_from_syncpath_to_home {
    mkdir -p $(dirname "$HOME/$1")
    echo -e "\nSyncing $root_sync_path/$1/ with $HOME/$1/"
    ${rsync_command} "$root_sync_path/$1/" "$HOME/$1/" --exclude venv
}

mkdir -p ${root_sync_path}/bsdev

[[ ! -d "$root_sync_path" ]] && echo "$root_sync_path doesn't exist. \
    Dropbox is probably not installed" && exit 1

if [[ "$1" == "to" ]]; then
    find $HOME -name ".sync" -not -path "${root_sync_path}/*" -printf "%P\n" |
    while read file; do rsync_from_home_to_syncpath $(dirname ${file}); done
fi

if [[ "$1" == "from" ]];then
    find ${root_sync_path} -name ".sync" -printf "%P\n" |
    while read file; do rsync_from_syncpath_to_home $(dirname ${file}); done

fi
