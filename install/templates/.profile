
#Template .profile: Source the dotfiles .profile file in the .profile in the homefolder.
if [ -f $DOTFILES/.profile ]; then
  . $DOTFILES/.profile
fi
