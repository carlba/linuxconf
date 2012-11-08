# .bashrc

# Keyboard shortcuts
bind '"\e[5~": history-search-backward'
bind '"\e[6~": history-search-forward'

# User specific aliases and functions

alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'
alias vi='vim'

export TERM=xterm-256color

PS1="[\\u@\\h:\\w] $"

# Source global definitions
if [ -f /etc/bashrc ]; then
	. /etc/bashrc
fi

# Aliases
alias tunneltowork='ssh -L 2222:10.10.11.200:22 cada@trillian.birdstep.com -N -f'
