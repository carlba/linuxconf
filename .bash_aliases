# Aliases
alias tunneltowork='ssh -f trillian.birdstep.com -L 2222:enterprise.d.birdstep.internal:22 -N'
alias tunneltoirc='ssh -f trillian.birdstep.com -L 6697:enterprise.d.birdstep.internal:6697 -N'
alias ssh@bernard="ssh -t cada@trillian.birdstep.com 'ssh root@195.242.62.239'"
alias ssh@florina.d.birdstep.internal="ssh -t root@florina.d.birdstep.internal"
alias ssh@cadora="ssh -t cada@trillian.birdstep.com 'ssh -t cada@10.10.11.1'"
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
