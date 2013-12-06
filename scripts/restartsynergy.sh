#!/bin/bash
source $HOME/dotfiles/bashrc.d/global.sh

if isHostOnline burken; then    
  pkill synergyc
  [ -e ~./Xmodmap ] && xmodmap ~/.Xmodmap
  synergyc burken
  [[ $- == *i* ]] && echo Synergy has been restarted. 
  [ -e ~/dotfiles/scripts/autoscreen.sh ] && ~/dotfiles/scripts/autoscreen.sh
elif isHostOnline marvin.birdstep.internal; then
  pkill synergyc
  [ -e ~./Xmodmap ] && xmodmap ~/.Xmodmap
  synergyc wincada.d.birdstep.internal
  [[ $- == *i* ]] && echo Synergy has been restarted.
  [ -e ~/dotfiles/scripts/autoscreen.sh ] && ~/dotfiles/scripts/autoscreen.sh
fi  
