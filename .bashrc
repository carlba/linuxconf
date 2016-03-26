# .bashrc

export DOTFILES=~/dotfiles

# Keyboard shortcuts
bind '"\e[5~": history-search-backward'
bind '"\e[6~": history-search-forward'

# User specific aliases and functions

alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'
alias vi='vim'
alias ls="ls --color=auto"

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

if [ -e ~/dotfiles/bashrc.d ]; then
  for f in ~/dotfiles/bashrc.d/*; do
    . $f
  done
fi

if command_exists lsb_release >/dev/null && [[ "$(lsb_release -si)" != "Ubuntu" ]]; then
  PROMPT_COMMAND='export PS1="\[\033]0;\u@\h:\w\007\]\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ "'
fi


# History settings
export HISTCONTROL=ignoredups:erasedups  # no duplicate entries
export HISTSIZE=100000                   # big big history
export HISTFILESIZE=100000               # big big history
shopt -s histappend                      # append to history, don't overwrite it

# Save and reload the history after each command finishes

export PROMPT_COMMAND="history -a; history -c; history -r; $PROMPT_COMMAND"

#export default editor
export EDITOR=vi