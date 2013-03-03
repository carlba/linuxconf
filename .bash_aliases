# Aliases
alias tunneltowork='ssh -f trillian.birdstep.com -L 2222:enterprise.d.birdstep.internal:22 -N'
alias ssh@bernard="ssh -t cada@trillian.birdstep.com 'ssh root@195.242.62.239'"
alias ssh@florina.d.birdstep.internal="ssh -t root@florina.d.birdstep.internal"
alias ssh@cadora="ssh -t cada@trillian.birdstep.com 'ssh -t cada@10.10.11.1'"
alias gitmodified="git status -s | awk '{if (\$1 == \"M\") print \$2}'"
alias fenixwiki="w3m http://wiki.carl.lambdaworks.se"
alias dump="links http://wiki.carl.lambdaworks.se/index.php/dump"
alias updatehosts="hoststohostsfile ~/dotfiles/hosts"
alias restartsynergy="pkill synergyc;synergyc burken"
alias Fenix="/opt/google/chrome/google-chrome --app=http://wiki.carl.lambdaworks.se/index.php/Main_Page"
