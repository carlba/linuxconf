#/bin/bash

if [ "$(hostname)" = "uburken" ]
  then
    xrandr --output DVI-I-1 --auto  --rotate normal  --dpi 65 --output HDMI-1 --auto --rotate left --primary --right-of DVI-I-1  --dpi 65
elif [ "$(hostname)" = "cadathink" ]
  then
    xrandr --output DP2 --auto  --rotate normal  --dpi 63 --output HDMI3 --auto --rotate left --primary --right-of DP2  --dpi 63 --output LVDS1 --off
fi
