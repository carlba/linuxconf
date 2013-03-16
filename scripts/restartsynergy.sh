#!/bin/bash
source ~/dotfiles/bashrc.d/global.sh

if isHostOnline burken; then    
  pkill synergyc
  synergyc burken
  [[ $- == *i* ]] && echo Synergy has been restarted.
  ~/dotfiles/scripts/autoscreen.sh
fi  
