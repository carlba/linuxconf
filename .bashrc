# .bashrc

# User specific aliases and functions

alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'
alias vi vim

export TERM=xterm-256color

#git
if [ -f /usr/bin/git ]
then    
    git config --global user.name $USER@$HOSTNAME
    git config --global user.email genzorg@gmail.comE
else
    echo the file does not exist
fi





cd ~




# Source global definitions
if [ -f /etc/bashrc ]; then
	. /etc/bashrc
fi
