(crontab -l 2>/dev/null; echo '* 23 * * *  /bin/rm -rf $HOME/temp/*') | crontab -
