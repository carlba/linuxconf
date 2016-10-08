#!/bin/bash
random_wallpaper=$(ls ~/Dropbox/data/wallpapers | python -c "import sys; import random;print(random.choice(sys.stdin.readlines()).rstrip())")

filename_no_ext=$(basename "$random_wallpaper" .jpg)
full_path="$HOME/Dropbox/data/wallpapers/$random_wallpaper"

convert $full_path "/tmp/$filename_no_ext.png"
i3lock -t -i "/tmp/$filename_no_ext.png"


