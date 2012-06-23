while getopts ":cx" opt; do
   case $opt in
      c)
         cd ~
         tar czvf ~/deploy/vi.tar.gz .vim .vimrc 
         cd ~/deploy
         ;;
      x)
         cd ~
         tar xzvf ~/deploy/vi.tar.gz --no-same-owner
         cd ~/deploy
         ;;
      \?)
         echo "Invalid option"
         ;;
   esac
done
