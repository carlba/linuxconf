dotfiles=~/dotfiles

. $dotfiles/bashrc.d/global.sh

tmp_dir=$(mktemp -d)

in_array() {
    local hay needle=$1
    shift
    for hay; do
        [[ $hay == $needle ]] && return 0
    done
    return 1
}

add_header () {
  echo "===================================================="
  echo -e "$text_cyan$1$text_reset"
}

add_template () {
  if [ -L ~/"$1" ] ; then
    echo The file is already symlinked
  else
    if grep -q "#Template" ~/$1; then
      echo "$1" is already being sourced
    else
      if [ -f ~/"$1" ] ; then
        if [ -f $dotfiles/install/templates/"$1" ]; then
          cat $dotfiles/install/templates/"$1" >> ~/"$1"
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
    echo "Generated paths"
    echo "HomePath: $home_path"
    echo "DotfilesPath: $dotfiles_path"
    for f in $(ls -a -I "." -I ".." $dotfiles_path )
    do
      if ! in_array $(basename $f) ${ignore_files[*]}; then
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
    if command_exists sudo; then
      sudo cp -rf "$1" "$2"
    else
      cp -rf "$1" "$2"
    fi
  fi
}

git_setup() {
  # Git
  # Update repo and all submodules
  pushd ~/dotfiles > /dev/null
  echo -e "$(git submodule init)"
  git submodule update > /dev/null
  git pull > /dev/null && git submodule update --init --recursive > /dev/null
  git submodule foreach --recursive git submodule update --init > /dev/null
  popd > /dev/null
}

ignore_files_setup()
{
  #Handle ignore_files
  ignore_files=(. .. .bashrc git_configuration.sh .gitmodules install linstall README.md tmp.tmp deploy .git .ssh .config .local *.~* .profile dotfiles.sublime-project dotfiles.sublime-workspace)

  if in_array xfce ${desktop_managers[*]}; then
    ignore_files+=(".mateconf")
  else
    ignore_files+=("xfce4")
  fi


  if [[ "$linux_env" == cygwin ]]
  then
    ignore_files+=(.xchat2 .mateconf .config .local Desktop .komodoedit)
    rm -rf ~/.bash_profile
  fi

  # cli mode preset (preset for command line)
  if [ "$1" == climode ]; then
    ignore_files+=(.xchat2 .mateconf .config .local Desktop .komodoedit share applications icons)
  fi

  echo "The contents of the ignore_files array: ${ignore_files[*]}"
}


# Source my own .bashrc after the one in the system if it exists otherwise symlink the dotfiles one to the home directory.

add_header "Adding template for .bashrc"
add_template ".bashrc"

add_header "Adding template for .profile"
add_template ".profile"

#Preparations
desktop_managers=($([ -d "/usr/share/xsessions" ] && find /usr/share/xsessions -name "*.desktop" -exec basename "{}" .desktop \;))

if [[ $(uname -a) == *CYGWIN* ]]; then
  linux_env=cygwin
fi

add_header "Clearing vim swap files in home directory"
clear_vim_swap $HOME

add_header "Configuring git"
git_setup

add_header "Configuring ignore files array"
ignore_files_setup

#If update only the git setup will be done
if [ "$1" == update ]; then
  add_header "Update only mode no installations will be made"
  exit
fi

#Installing and copying files

add_header "Installing dotfiles.sh file"
install_file templates/dotfiles.sh /etc/profile.d/

# Setup symlinks between dotfiles and home directory
add_header "Going through all files in the dotfiles directory"
loop_dir
loop_dir .config

if [[ "$linux_env" != cygwin ]] && [ -z "desktop_managers" ]; then
  loop_dir .local/share/icons
  loop_dir .local/share/applications
fi

# Handling of special files

add_header "Handling of special files"
add_header "SSH config file"
[[ ! -e ~/.ssh/config ]] && ln -s ~/dotfiles/.ssh/config ~/.ssh/config
add_header ".vimrc"
ln -sf ~/dotfiles/.vim/.vimrc ~/.vimrc
add_header

#Dependencies

# https://github.com/sickill/stderred

add_header "Installing libstderred"
if [[ ! -e "/usr/local/lib/libstderred.so" ]];then
  pushd $tmp_dir > /dev/null
  sudo apt-get install build-essential cmake
  git clone git://github.com/sickill/stderred.git > /dev/null
  cd stderred
  make > /dev/null
  popd > /dev/null
else
  echo "Already installed"
fi
add_header


#Vim TabBar

if command_exists apt-get; then
  if command_exists sudo; then
    sudo apt-get install ctags > /dev/null
  else
    apt-get install ctags > /dev/null
  fi
fi
