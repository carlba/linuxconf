#!/bin/bash

#root_sync_path="/media/$(whoami)/DATA/backup"
root_sync_path="$HOME/Dropbox/transfer"

mkdir -p $root_sync_path/bsdev

rsync -av /home/cada/bsdev/gfk-http-collector $root_sync_path/bsdev --exclude venv
rsync -av /home/cada/bsdev/analytics4 $root_sync_path/bsdev --exclude venv
rsync -av /home/cada/.PyCharm50 $root_sync_path

