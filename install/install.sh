desktop_managers=($(find /usr/share/xsessions -name "*.desktop" -exec basename "{}" .desktop ";"))
echo ${desktop_managers[*]}

in_array() {
    local hay needle=$1
    shift
    for hay; do
        [[ $hay == $needle ]] && return 0
    done
    return 1
}

ignorefiles=(.bashrc git_configuration.sh .gitmodules install linstall README.md tmp.tmp deploy .. .git) 

if in_array xfce ${desktop_managers[*]}; then
  ignorefiles+=(".mateconf")
fi

if in_array mate ${desktop_managers[*]}; then
  #ignorefiles+=(".")
  echo "Inarray mate"
fi


# Source my own .bashrc after the systemone if it exists otherwise symlink the dotfiles one to the homedir.

if grep -q "#Template .bashrc" ~/.bashrc; then
  echo "dotfiles/.bashrc is already being sourced"
else
  if [ -f ~/.bashrc ] ; then
    cat templates/.bashrc >> ~/.bashrc
    echo Working
  fi
fi

echo "Going through all files in the dotfiles dir."
for f in $(find ../ -name '*' -maxdepth 1)
do
  if ! in_array $(basename $f) ${ignorefiles[*]}; then
    if [ -f ~/$(basename $f) ] || [ -d ~/$(basename $f) ]; then
      echo "~/$(basename $f) Already exists. Overwrite y/n?"
      read answer
      case "$answer" in
        y)
          echo "User replied y"
          rm -r ~/$(basename $f)
          ;;
        n)
          echo "User replied n"
          continue
          ;;
        *)
          echo "~/$(basename $f) Already exists. Overwrite y/n?"

          ;;
      esac
      echo $(basename $f)
      ln -s ~/dotfiles/$(basename $f) ~/$(basename $f)
      echo ~/dotfiles/$(basename $f)
      echo ~/$(basename $f)
    fi    
  fi

done