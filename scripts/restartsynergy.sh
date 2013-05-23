#!/bin/bash
source $HOME/dotfiles/bashrc.d/global.sh

if isHostOnline burken; then    
  pkill synergyc
  synergyc burken
  [[ $- == *i* ]] && echo Synergy has been restarted.
  ~/dotfiles/scripts/autoscreen.sh
fi

if isHostOnline marvin.birdstep.internal; then
  pkill synergyc
  synergyc wincada.d.birdstep.internal
  [[ $- == *i* ]] && echo Synergy has been restarted.
  ~/dotfiles/scripts/autoscreen.sh
fi  
