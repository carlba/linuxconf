#!/bin/bash
source $HOME/dotfiles/bashrc.d/global.sh

if is_host_online burken; then    
  pkill synergyc
  [ -e $HOME/.Xmodmap ] && xmodmap $HOME/.Xmodmap
  synergyc burken
  [[ $- == *i* ]] && echo Synergy has been restarted. 
  [ -e ~/dotfiles/scripts/autoscreen.sh ] && ~/dotfiles/scripts/autoscreen.sh
elif is_host_online wincada.d.birdstep.internal; then
  pkill synergyc
  [ -e $HOME/.Xmodmap ] && xmodmap $HOME/.Xmodmap
  synergyc wincada.d.birdstep.internal
  [[ $- == *i* ]] && echo Synergy has been restarted.
  [ -e ~/dotfiles/scripts/autoscreen.sh ] && ~/dotfiles/scripts/autoscreen.sh
fi  
