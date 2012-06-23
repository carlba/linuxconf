# .bashrc

# User specific aliases and functions

alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'

export TERM=xterm-256color
cd ~

# Source global definitions
if [ -f /etc/bashrc ]; then
	. /etc/bashrc
fi
