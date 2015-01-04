# Aliases
alias tunneltowork='ssh -f trillian.birdstep.com -L 2222:enterprise.d.birdstep.internal:22 -N'
alias tunneltohome='ssh -f root@carlb.dyndns.org -L 8080:localhost:80 -L 9091:localhost:9091 -N'

alias gitmodified="git status -s | awk '{if (\$1 == \"M\") print \$2}'"
alias dump="links http://wiki.carl.lambdaworks.se/index.php/dump"
alias updatehosts="hoststohostsfile ~/dotfiles/hosts"
alias fenixwiki="/opt/google/chrome/google-chrome --app=http://wiki.carl.lambdaworks.se/index.php/Main_Page"
alias clipdate="date +%F | tr -d '\n' | xclip -sel c"
alias cliptime="date +%T | tr -d '\n' | xclip -sec c"
alias pingtest="ping ping.birdstep.com"
alias getextip="curl http://wtfismyip.com/text"
alias screenoff="xset -display :0.0 dpms force off"
alias dudefault="du -hx --max-depth=1 | sort -hr | head"
