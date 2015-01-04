if [ -z "$1" ];
then
    echo "Plese enter a parameter when launching the script"
    exit
fi

yum -y install git

git config --global core.editor vim

git init
git remote add origin https://github.com/carlba/linuxconf
git fetch
git checkout -t origin/$1
git branch -aav