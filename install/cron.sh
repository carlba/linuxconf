(crontab -l 2>/dev/null; echo '* 23 * * *  /bin/rm -rf $HOME/temp/*') | crontab -
(crontab -l 2>/dev/null; echo '* * * * *  /usr/bin/find $HOME -name *~ -exec -rm -rf {} \;') | crontab -
