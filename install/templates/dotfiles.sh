export DOTFILES=$HOME/dotfiles

if command -v lsb_release >/dev/null 2>&1 && [[ "$(lsb_release -si)" == "Ubuntu" ]]; then
  export TERM="xterm-256color"
fi
