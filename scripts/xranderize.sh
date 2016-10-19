#/bin/bash

if [ "$(hostname)" = "uburken" ]
  then
    xrandr --output DVI-I-1 --auto  --primary --dpi 84 --rotate normal --output HDMI-1 --auto --dpi 84 --rotate left --right-of DVI-I-1 
elif [ "$(hostname)" = "cadathink" ]
  then
    xrandr --output DP2 --auto  --primary --rotate normal  --dpi 70 --output HDMI3 --auto --rotate left --primary --right-of DP2  --dpi 70 --output LVDS1 --off
fi
