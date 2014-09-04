dotfiles=~/dotfiles

. $DOTFILES/bashrc.d/global.sh

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
      if ! in_array $(basename $f) ${ignorefiles[*]}; then
        if [ -f $home_path/$(basename $f) ] || [ -d $home_path/$(basename $f) ]; then
          if [ -p "$home_path/$(basename $f)"  ] || [ -L "$home_path/$(basename $f)" ]; then
            # File is symlink
            continue
          else
            true
            # File is not symlink
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
      fi
    done
}

install_file() {
  if [ -f "$1" ]; then
    if commandExists sudo; then
      sudo cp -rf "$1" "$2"
    else
      cp -rf "$1" "$2"
    fi
  fi
}

clear_vim_swap() {
  find ~ -mount -name "*~" -exec rm -rf {} \;
}

git_setup() {
  # Git
  # Update repo and all submodules
  cd ~/dotfiles
  git submodule init
  git submodule update
  git pull && git submodule update --init --recursive
  git submodule foreach --recursive git submodule update --init
  cd ~/dotfiles/install
}

ignorefiles_setup()
{
  #Handle ignorefiles
  ignorefiles=(. .. .bashrc git_configuration.sh .gitmodules install linstall README.md tmp.tmp deploy .git .ssh .config .local *.~* .profile)

  if in_array xfce ${desktop_managers[*]}; then
    ignorefiles+=(".mateconf")
  fi

  if [[ "$linuxenv" == cygwin ]]
  then
    ignorefiles+=(.xchat2 .mateconf .config .local Desktop .komodoedit)
    rm -rf ~/.bash_profile
  fi

  # cli mode preset (preset for commandline)
  if [ "$1" == climode ]; then
    ignorefiles+=(.xchat2 .mateconf .config .local Desktop .komodoedit share applications icons)
  fi

  echo "The contents of the ignorefiles array: ${ignorefiles[*]}"
}


# Source my own .bashrc after the systemone if it exists otherwise symlink the dotfiles one to the homedir.

add_template ".bashrc"
add_template ".profile"



#Preparations
clear_vim_swap
git_setup
desktop_managers=($(find /usr/share/xsessions -name "*.desktop" -exec basename "{}" .desktop ";"))
ignorefiles_setup

if [[ $(uname -a) == *CYGWIN* ]]; then
  linuxenv=cygwin
fi


#If update only the git setup will be done

if [ "$1" == update ]; then
  exit
fi

#Installing and copying files

# Installing dotfiles.sh file
install_file templates/dotfiles.sh /etc/profile.d/

# Setup symlinks between dotfiles and home directory
echo "Going through all files in the dotfiles dir."

loop_dir
loop_dir .config

if [[ "$linuxenv" != cygwin ]]; then
  loop_dir .local/share/icons
  loop_dir .local/share/applications
fi

#Handle special files
#ssh.config
ln -s ~/dotfiles/.ssh/config ~/.ssh/config
ln -sf ~/dotfiles/.vim/.vimrc ~/.vimrc

#Dependencies

#Vim TabBar


if commandExists apt-get; then
  if commandExists sudo; then
    sudo apt-get install ctags
  else
    apt-get install ctags
  fi
fi
