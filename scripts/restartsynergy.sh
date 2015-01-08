#!/bin/bash
source $HOME/dotfiles/bashrc.d/global.sh

home=burken
work=10.10.11.43

if isHostOnline $home; then    
  pkill synergyc
  [ -e $HOME/.Xmodmap ] && xmodmap $HOME/.Xmodmap
  synergyc $home 
  [[ $- == *i* ]] && echo Synergy has been restarted. 
  [ -e ~/dotfiles/scripts/autoscreen.sh ] && ~/dotfiles/scripts/autoscreen.sh
elif isHostOnline $work; then
  echo $work
  pkill synergyc
  [ -e $HOME/.Xmodmap ] && xmodmap $HOME/.Xmodmap
  synergyc $work
  [[ $- == *i* ]] && echo Synergy has been restarted.
  [ -e ~/dotfiles/scripts/autoscreen.sh ] && ~/dotfiles/scripts/autoscreen.sh
fi  
