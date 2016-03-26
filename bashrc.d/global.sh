#!/bin/bash

green='\e[0;32m' # '\e[1;32m' is too bright for white bg.
red='\e[1;31m'
red='\e[1;31m'
end_color='\e[0m'

text_black='\e[0;30m'             # Black - Regular
text_red='\e[0;31m'               # Red
text_green='\e[0;32m'             # Green
text_yellow='\e[0;33m'            # Yellow
text_blue='\e[0;34m'              # Blue
text_purple='\e[0;35m'            # Purple
text_cyan='\e[0;36m'              # Cyan
text_white='\e[0;37m'             # White
text_bold_black='\e[1;30m'        # Black - Bold
text_bold_red='\e[1;31m'          # Red
text_gold_green='\e[1;32m'        # Green
text_bold_yellow='\e[1;33m'       # Yellow
text_bold_blue='\e[1;34m'         # Blue
text_bold_purple='\e[1;35m'       # Purple
text_bold_cyan='\e[1;36m'         # Cyan
text_bold_white='\e[1;37m'        # White
text_underlne_kblk='\e[4;30m'     # Black - Underline
text_underlne_dred='\e[4;31m'     # Red
text_underlne_dgrn='\e[4;32m'     # Green
text_underlne_dylw='\e[4;33m'     # Yellow
text_underlne_dblu='\e[4;34m'     # Blue
text_underlne_dpur='\e[4;35m'     # Purple
text_underlne_dcyn='\e[4;36m'     # Cyan
text_underlne_dwht='\e[4;37m'     # White
text_background_black='\e[40m'    # Black - Background
text_background_red='\e[41m'      # Red
text_background_green='\e[42m'    # Green
text_background_yellow='\e[43m'   # Yellow
text_background_blue='\e[44m'     # Blue
text_background_purple='\e[45m'   # Purple
text_background_cyan='\e[46m'     # Cyan
text_background_white='\e[47m'    # White
text_reset='\e[0m'                # Text Reset


function instr_file { 
  local needle="$1" 
  local filepath="$2"
  if grep -q "$needle" $filepath; then
    return 0
  else
    return 1
  fi
}

function md5gen {
  echo -n "$1" | md5sum
}

function get_current_ip {
  #First param is the filter 
  ifconfig | grep "inet addr:$1"| grep -v "127.0.0.1" | cut -d: -f2 | awk '{ print $1}'
}

function is_host_online {
	ping ${1} -c 1 &> /dev/null
	if [[ $? == 0 ]]
	then
      [[ $- == *i* ]] && echo Host ${1} is online.
      return 0 # Note that zero means successful. It is the return value not a TRUE or FALSE value.
	else
      [[ $- == *i* ]] && echo Host ${1} is offline.
      return 1	# Note that zero means successful. It is the return value not a TRUE or FALSE value.
	fi
}

function is_host_respoding_on_port {
  nc -z -w 3 $1 $2 &> /dev/null
  if [[ $? == 0 ]]
  then
      [[ $- == *i* ]] && echo Host ${1} is responding on port $2.
      return 0 # Note that zero means successful. It is the return value not a TRUE or FALSE value.
  else
      [[ $- == *i* ]] && echo Host ${1} is NOT responding on port $2.
      return 1  # Note that zero means successful. It is the return value not a TRUE or FALSE value.
  fi
}

function close_gui_application {
  wmctrl -c "$1"
}

function ping_test {
  ping ping.birdstep.com
}

function command_exists {
	command -v $1 >/dev/null 2>&1
  if [[ $? == 0 ]]
	then
      [[ $- == *i* ]] && echo  Command ${1} does exist.
      return 0 # Note that zero means successful. It is the return value not a TRUE or FALSE value.
	else
      [[ $- == *i* ]] && echo Command ${1} does not exist.
      return 1	# Note that zero means successful. It is the return value not a TRUE or FALSE value.
	fi
}

clear_vim_swap() {  
  find $1 -mount -name "*~" -exec rm -rf {} \;
}

function guake_new_tab {
  local server=$1
  local user=$2
  local tab_title="($3)"
  guake --new-tab ~ && guake -r "$1 $tab_title" && guake --execute-command="ssh -t $user@$server \"tmux new -s cada || tmux new -t cada\"" 
}

function virtualenv_bs {
  [[ ! -f "requirements.txt" ]] && echo "No requirements.txt file in folder" && exit
  virtualenv venv && source venv/bin/activate
  pip install --upgrade pip
  pip install -r requirements.txt
  deactivate
}
