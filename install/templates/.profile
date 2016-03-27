
#Template .profile: Source the dotfiles .profile file in the .profile in the home folder.
if [ -f $DOTFILES/.profile ]; then
  . $DOTFILES/.profile
fi

# set PATH so it includes user's private bin if it exists
if [ -d "$HOME/bin" ] ; then
    PATH="$HOME/bin:$PATH"
fi
