#!/bin/bash
. $DOTFILES/scripts/global.sh
SCRIPTS=$DOTFILES/scripts


currentip=$(getCurrentIP)

if [[ "$currentip" == *192.168* ]]; then  
  source ~/.screenlayout/hemma.sh
elif [[ "$currentip" == *10.10* ]]; then
  source ~/.screenlayout/dualmonitor.sh
fi
