#!/usr/bin/env bash
kill -9 `cat tmp/pids/resque.pid`
bundle exec rake resque:work QUEUE='*' PIDFILE='tmp/pids/resque.pid' BACKGROUND=yes
