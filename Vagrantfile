# -*- mode: ruby -*-
# vi: set ft=ruby :

$script = <<SCRIPT
sudo apt-get update
sudo apt-get install -y git-core curl zlib1g-dev build-essential \
                     libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 \
                     libxml2-dev libxslt1-dev libcurl4-openssl-dev software-properties-common

cd
git clone git://github.com/sstephenson/rbenv.git .rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
git clone git://github.com/sstephenson/ruby-build.git ~/.rbenv/plugins/ruby-build
echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.bashrc
export PATH=$PATH:/home/vagrant/.rbenv/bin/
eval "$(rbenv init -)"
export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"
rbenv install 2.1.3
rbenv global 2.1.3 # match whatever in .ruby-version file
echo "gem: --no-ri --no-rdoc" > /home/vagrant/.gemrc
gem install bundler
rbenv rehash

# mysql
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password password 111111'
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password 111111'

sudo apt-get install -y  mysql-server   mysql-client  libmysqlclient-dev

# js runtime
sudo apt-get install -y nodejs

# apache
sudo apt-get install -y apache2 apache2-prefork-dev libcurl4-openssl-dev libaprutil1-dev
gem install passenger
rbenv rehash
passenger-install-apache2-module

# now need to change apache2.conf to allow visit to dir other than /var/www
# otherwise you get apache2: no permission to visit the server / error
# think this: sudo sed -i -e 's/Require\ all\ denied/Require\ all\ granted/' /etc/apache2/apache2.conf
sudo rm -rf /var/www
sudo ln -fs /vagrant /var/www

sudo rm /etc/apache2/sites-enabled/000-default.conf

sudo tee -a  /etc/apache2/sites-enabled/happycasts.conf <<FILE
LoadModule passenger_module /home/vagrant/.rbenv/versions/2.1.3/lib/ruby/gems/2.1.0/gems/passenger-4.0.53/buildout/apache2/mod_passenger.so
<IfModule mod_passenger.c>
  PassengerRoot /home/vagrant/.rbenv/versions/2.1.3/lib/ruby/gems/2.1.0/gems/passenger-4.0.53
  PassengerDefaultRuby /home/vagrant/.rbenv/versions/2.1.3/bin/ruby
</IfModule>
<VirtualHost *:80>
   ServerName example.com
   DocumentRoot /var/www/public/
   RailsEnv development
   <Directory /var/www/public/ >
      AllowOverride all
      Options -MultiViews
   </Directory>
</VirtualHost>
FILE

cd /vagrant/
bundle

# FIXME: if run twice... should replace as a line
sed -i -e 's/password:/password:\ 111111/' ./config/database.yml

bundle exec rake db:create;bundle exec rake db:migrate
sudo apachectl graceful

SCRIPT

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.provision "shell", inline: $script, privileged: false
  # config.vm.network "forwarded_port", guest: 80, host: 8080

  # https://laracasts.com/lessons/get-off-mamp-now MUCH better than
  # forwarded_port
  config.vm.network :private_network, ip: "192.168.33.21"

  config.vm.provider "virtualbox" do |v|
    v.memory = 2048
  end
end
