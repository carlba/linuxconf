source ~/dotfiles/scripts/global.sh

function addhost() {
  local dotfileshosts=~/dotfiles/hosts
  local hostname="$1"
  local ip="$2"
  local hostsfile=/etc/hosts
  if ( instrFile "$1" "$dotfileshosts") || ( instrFile "$2" "$dotfileshosts");  then
    echo "Exists" 
  else
    echo "Not Exists"
    echo -e "$1 \t $2" >> $dotfileshosts
  fi
  
  if ( instrFile "$1" "$hostsfile") || ( instrFile "$2" "$hostsfile");  then
    echo "Exists" 
  else
    echo "Not Exists"
    sudo su -c "echo -e \"$1 \t $2\" >> $hostsfile"
  fi
}

function hoststohostsfile {
  local hostsfile="$1"
  while read line; do
    echo $line
    IFS="\t" read ip addr <<<$line
    addHost $ip $addr 
  done < $1
}




