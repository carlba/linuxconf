# Aliases
alias tunneltowork='ssh -f trillian.birdstep.com -L 2222:enterprise.d.birdstep.internal:22 -N'
alias tunneltohome='ssh -f root@carlb.dyndns.org -L 8080:localhost:80 -L 9091:localhost:9091 -N'
alias tunneltoirc='ssh -f trillian.birdstep.com -L 6697:enterprise.d.birdstep.internal:6697 -N'
alias tunneltotigger='ssh -t -R 8001:mike.birdstep.internal:8000 cada@trillian.birdstep.com ssh -t -R 8001:localhost:8001 root@tigger.d.birdstep.internal'
alias ssh@bernard="ssh -t cada@trillian.birdstep.com 'ssh root@195.242.62.239'"


alias gitmodified="git status -s | awk '{if (\$1 == \"M\") print \$2}'"
alias fenixwiki="w3m http://wiki.carl.lambdaworks.se"
alias dump="links http://wiki.carl.lambdaworks.se/index.php/dump"
alias updatehosts="hoststohostsfile ~/dotfiles/hosts"
alias Fenix="/opt/google/chrome/google-chrome --app=http://wiki.carl.lambdaworks.se/index.php/Main_Page"
alias clipdate="date +%F | tr -d '\n' | xclip -sel c"
alias cliptime="date +%T | tr -d '\n' | xclip -sec c"
alias tunneltorabbitmq@cygni="ssh -t -L 55555:bastion.d:55555 cada@bastion.d ssh -t -L *:55555:localhost:55672 root@50.28.36.178"
alias root@cygni="ssh -t cada@trillian.birdstep.com 'ssh root@50.28.36.178\'"
alias root@merope="ssh -t cada@trillian.birdstep.com 'ssh root@50.28.36.179\'"
alias curlbs="curl -A "AliceAutoUpdateAgent" --insecure"
alias pingtest="ping ping.birdstep.com"
alias getextip="curl http://wtfismyip.com/text"
alias screenoff="xset dpms force off"
alias dudefault="du -hx --max-depth=1 | sort -hr | head"
