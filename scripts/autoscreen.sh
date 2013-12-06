#!/bin/bash
. $DOTFILES/bashrc.d/global.sh
SCRIPTS=$DOTFILES/scripts


currentip=$(getCurrentIP)


if [[ "$currentip" == *192.168* ]]; then  
  [ -e  ~/.screenlayout/hemma.sh ] && source ~/.screenlayout/hemma.sh
  #synergyc burken
elif [[ "$currentip" == *10.10* ]]; then
  [ -e  ~/.screenlayout/dualmonitor.sh ] && source ~/.screenlayout/dualmonitor.sh
  #synergyc wincada.d.birdstep.internal
fi
