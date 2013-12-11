#!/bin/bash
source $HOME/dotfiles/bashrc.d/global.sh

if isHostOnline burken; then    
  pkill synergyc
  [ -e $HOME/.Xmodmap ] && xmodmap $HOME/.Xmodmap
  synergyc burken
  [[ $- == *i* ]] && echo Synergy has been restarted. 
  [ -e ~/dotfiles/scripts/autoscreen.sh ] && ~/dotfiles/scripts/autoscreen.sh
elif isHostOnline wincada.d.birdstep.internal; then
  pkill synergyc
  [ -e $HOME/.Xmodmap ] && xmodmap $HOME/.Xmodmap
  synergyc wincada.d.birdstep.internal
  [[ $- == *i* ]] && echo Synergy has been restarted.
  [ -e ~/dotfiles/scripts/autoscreen.sh ] && ~/dotfiles/scripts/autoscreen.sh
fi  
