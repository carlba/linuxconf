# Aliases
alias tunneltowork='ssh -L 2222:10.10.11.200:22 cada@trillian.birdstep.com -N -f'
alias ssh@bernard="ssh -t cada@trillian.birdstep.com 'ssh root@195.242.62.239'"
alias ssh@florina.d.birdstep.internal="ssh -t root@florina.d.birdstep.internal"
alias ssh@cadora="ssh -t cada@trillian.birdstep.com 'ssh -t cada@10.10.11.1'"
alias gitmodified="git status -s | awk '{if (\$1 == \"M\") print \$2}'"
alias fenixwiki="w3m http://wiki.carl.lambdaworks.se"
alias dump="links http://wiki.carl.lambdaworks.se/index.php/dump"
