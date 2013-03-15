#!/bin/bash
source ~/dotfiles/scripts/global.sh

if isHostOnline burken; then    
  pkill synergyc
  synergyc burken
  [[ $- == *i* ]] && echo Synergy has been restarted.
  ~/dotfiles/scripts/autoscreen.sh
fi  
