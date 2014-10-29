
### ruby

    rbenv install 2.1.3
    

### mysql

    sudo apt-get install mysql-server  mysql-client  libmysqlclient-dev

### Installing Nginx & Passenger

Install Phusion's PGP key to verify packages

    sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 561F9B9CAC40B2F7

Add HTTPS support to APT

    sudo apt-get install apt-transport-https ca-certificates

Add the passenger repository. Note that this only works for Ubuntu 14.04. For other versions of Ubuntu, you have to add the appropriate repository according to Section 2.3.1 of this [link](https://www.phusionpassenger.com/documentation/Users%20guide%20Nginx.html).

    sudo add-apt-repository 'deb https://oss-binaries.phusionpassenger.com/apt/passenger trusty main'
    sudo apt-get update

Install nginx and passenger

    sudo apt-get install nginx-extras passenger

Next, we need to update the Nginx configuration to point Passenger to the version of Ruby that we're using. You'll want to open up /etc/nginx/nginx.conf in your favorite editor,

    sudo vim /etc/nginx/nginx.conf

find the following lines, and uncomment them:

    passenger_root /usr/lib/ruby/vendor_ruby/phusion_passenger/locations.ini;
    passenger_ruby /usr/bin/ruby;

update the second line to read:

    passenger_ruby /home/deploy/.rbenv/shims/ruby;
    
### config passenger


    sudo rm /etc/nginx/sites-enabled/default
    sudo ln -s /home/your_name/happycasts/config/nginx.conf /etc/nginx/conf.d/happycasts.conf
    sudo service nginx restart


### Install JavaScript Runtime

A JavaScript Runtime is needed for Asset Pipeline to work. Any runtime will do but Node.js is recommended.

    sudo apt-get install nodejs


