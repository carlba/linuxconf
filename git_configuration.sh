if [ -z "$1" ];
then
    echo "Plese enter a parameter when launching the script"
    exit
fi

yum -y install git

git config --global core.editor vim

git init
git remote add -t $1 origin https://github.com/carlba/linuxconf
git pull 
git checkout $1