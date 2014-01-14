#!/usr/bin/env bash
kill -9 `cat tmp/pids/resque.pid`
bundle exec rake resque:work QUEUE='*' PIDFILE='tmp/pids/resque.pid' BACKGROUND=yes RAILS_ENV=${1:-development}
# in prouction sever you need to run this script: ./script/resque_restart.sh production
