#/bin/bash

if [ "$(hostname)" = "uburken" ]
  then
    xrandr --output DVI-I-1 --auto  --rotate normal  --dpi 65 --output HDMI-1 --auto --rotate left --primary --right-of DVI-I-1  --dpi 65
elif [ "$(hostname)" = "cadathink" ]
  then
    echo "test"
fi
