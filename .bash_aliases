# Aliases
alias gitmodified="git status -s | awk '{if (\$1 == \"M\") print \$2}'"
alias dump="links http://wiki.carl.lambdaworks.se/index.php/dump"
alias updatehosts="hoststohostsfile ~/dotfiles/hosts"
alias pingtest="ping ping.birdstep.com"
alias getextip="curl http://wtfismyip.com/text"
alias dudefault="du -hx --max-depth=1 | sort -hr | head"
alias isodate='date "+%Y-%m-%d"'
alias clipdate='date "+%Y-%m-%d" | xargs echo -n | tee >(xclip) >(xclip -sel c) > /dev/null'
alias tmuxify='tmux new -s cada || tmux at -t cada'
alias i3lockify='find /home/cada/Dropbox/data/wallpapers -name "*" | python -c "import sys;import random; print(random.choice(sys.stdin.readlines()).rstrip())" | xargs -I{} convert {} /tmp/wallpaper.png; i3lock -t -i /tmp/wallpaper.png'
alias screenoff='xset dpms force off'
