yum -y install git
git config --global user.name "user"
git config --global user.email ""
echo "==== Git Configuration ===="
git config --list
cd ~
git init
git remote add origin https://github.com/carlba/linuxconf.git
git pull
git branch --set-upstream user origin/user
