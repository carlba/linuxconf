
#Template .bashrc:Source the dotfiles .bashrc file in the .bashrc file in the homefolder
if [ -f dotfiles/.bashrc ]; then
  . dotfiles/.bashrc
fi
