yum -y install git
git config --global user.name "carlba"
git config --global user.email "genzorg@gmail.com"
echo "==== Git Configuration ===="
git config --list
cd ~
git init
git remote add origin https://github.com/carlba/linuxconf.git
git pull
git reset --hard HEAD
git pull
