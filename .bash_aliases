#!/bin/bash
# Aliases
alias gitmodified="git status -s | awk '{if (\$1 == \"M\") print \$2}'"
alias updatehosts="hoststohostsfile ~/dotfiles/hosts"
alias getextip="curl http://wtfismyip.com/text"
alias dudefault="du -hx --max-depth=1 | sort -hr | head"
alias isodate='date "+%Y-%m-%d"'
alias clipdate='date "+%Y-%m-%d" | xargs echo -n | tee >(xclip) >(xclip -sel c) > /dev/null'
alias tmuxify='tmux new -s cada || tmux at -t cada'
alias i3lockify='find /home/cada/Dropbox/data/wallpapers -name "*" | python -c "import sys;import random; print(random.choice(sys.stdin.readlines()).rstrip())" | xargs -I{} convert {} /tmp/wallpaper.png; i3lock -t -i /tmp/wallpaper.png'
alias screenoff='xset dpms force off'
alias smsi_vpn_connect='sudo openconnect --script /etc/vpnc/vpnc-script -b --user=cbackstrom https://greendog.smithmicro.com'
alias smsi_vpn_disconnect='sudo kill `ps aux|grep openconnect|grep -v grep|cut -c 10-15`'
alias xranderize1='xrandr --output DP2 --off  --output HDMI3 --off --output LVDS1 --auto'
alias mouse_sensitity_medium='xset 1.7 0'
