# .bashrc

source ~/dotfiles/scripts/global.sh
source ~/dotfiles/scripts/hosts.sh

# Keyboard shortcuts
bind '"\e[5~": history-search-backward'
bind '"\e[6~": history-search-forward'

# History settings
HISTSIZE=50000
HISTFILESIZE=500000

# User specific aliases and functions

alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'
alias vi='vim'


PS1="[\\u@\\h:\\w] $"

# Source global definitions
if [ -f /etc/bashrc ]; then
	. /etc/bashrc
fi

# Alias definitions.
# You may want to put all your additions into a separate file like
# ~/.bash_aliases, instead of adding them here directly.
# See /usr/share/doc/bash-doc/examples in the bash-doc package.

if [ -f ~/dotfiles/.bash_aliases ]; then
    . ~/dotfiles/.bash_aliases
fi
# Start tmux if it isn't already running
if [ $TERM != "screen-256color" ] && [ $TERM != "screen" ]; then
    export TERM=xterm-256color
    #tmux attach || tmux new
fi

#Colors for ls command
eval $( dircolors -b $HOME/dotfiles/ls-colors-solarized/dircolors )
