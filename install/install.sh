dotfiles=~/dotfiles

in_array() {
    local hay needle=$1
    shift
    for hay; do
        [[ $hay == $needle ]] && return 0
    done
    return 1
}

add_template () {
  if [ -L ~/"$1" ] ; then
    echo The file is already symlinked       
  else
    if grep -q "#Template" ~/$1; then
      echo "$1" is already being sourced
      break
    else
      if [ -f ~/"$1" ] ; then
        if [ -f templates/"$1" ]; then
          cat templates/"$1" >> ~/"$1"
          echo "Added template to $1"
        else
          echo "Template file missing        "
        fi
      else
        ln -s $dotfiles/"$1" ~/"$1"
        echo "Created symlink"
      fi
    fi   
  fi
}

loop_dir () {
    echo $loop_path
    local loop_path="$1"
    if [ -n "${1+x}" ]; then
      home_path=~/$loop_path
      dotfiles_path=$dotfiles/$loop_path
    else
      home_path=~
      dotfiles_path=$dotfiles
    fi
    echo "Generated pathes"
    echo "HomePath: $home_path"
    echo "DotfilesPath: $dotfiles_path"
    for f in $(ls -a -I "." -I ".." $dotfiles_path )
    do
      echo $f
      if ! in_array $(basename $f) ${ignorefiles[*]}; then
        if [ -f $home_path/$(basename $f) ] || [ -d $home_path/$(basename $f) ]; then
          if [ -p "$home_path/$(basename $f)"  ] || [ -L "$home_path/$(basename $f)" ]; then
            echo "File is symlink"
            continue
          else
            echo "File is not symlink"
          fi
          echo $home_path/$(basename $f) Already exists. Overwrite y/n?
          echo  $(basename $f)
          read answer
          case "$answer" in
            y)
              echo "User replied y"
              rm -r $home_path/$(basename $f)
              ;;
            n)
              echo "User replied n"
              continue
              ;;
            *)
              echo "$home_path$/(basename $f) Already exists. Overwrite y/n?"

              ;;
          esac
        fi
        echo "Creating symlink $home_path/$(basename $f) -> $dotfiles_path/$(basename $f)"
        ln -s $dotfiles_path/$(basename $f) $home_path/$(basename $f)
        #ln -s $(basename $f) ~/$(basename $f)
      fi
    done
}

install_file() {
  if [ -f "$1" ]; then
    sudo cp -rf "$1" "$2"
  fi
}




# Git

# Update repo and all submodules
cd ~/dotfiles
git submodule init
git submodule update
git pull && git submodule update --init --recursive
git submodule foreach --recursive git submodule update --init
cd ~/dotfiles/install

if [ "$1" == update ]; then
  exit
fi

# Installing dotfiles.sh file
install_file templates/dotfiles.sh /etc/profile.d/


desktop_managers=($(find /usr/share/xsessions -name "*.desktop" -exec basename "{}" .desktop ";"))
echo ${desktop_managers[*]}

ignorefiles=(. .. .bashrc git_configuration.sh .gitmodules install linstall README.md tmp.tmp deploy .git .ssh .config) 

if in_array xfce ${desktop_managers[*]}; then
  ignorefiles+=(".mateconf")
fi

if in_array mate ${desktop_managers[*]}; then
  #ignorefiles+=(".")
  echo "Inarray mate"
fi

if [[ $(uname -a) == *CYGWIN* ]]; then
  linuxenv=cygwin
  echo $linuxenv
fi

if [[ "$linuxenv" == cygwin ]]
then
  ignorefiles+=(.xchat2 .mateconf .config .local Desktop .komodoedit) 
fi

# cli mode preset (preset for commandline)
if [ "$1" == climode ]; then
  ignorefiles+=(.xchat2 .mateconf .config .local Desktop .komodoedit)
fi

echo "The contents of the ignorefiles array: ${ignorefiles[*]}"

# Source my own .bashrc after the systemone if it exists otherwise symlink the dotfiles one to the homedir.
add_template ".bashrc"
add_template ".profile"

echo "Going through all files in the dotfiles dir."

loop_dir
loop_dir .config

#Handle special files
#ssh.config
ln -s ~/dotfiles/.ssh/config ~/.ssh/config

#Dependencies

#Vim TabBar
sudo apt-get install ctags

#Download .simplenoterc file to homefolder.
#scp root@carlb.dyndns.org:~/.simplenoterc ~/
#chmod 600 ~/.simplenoterc
