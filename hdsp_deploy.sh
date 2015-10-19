#!/usr/bin/env bash
gulp build
scp -r dist haoduoshipin.com:
ssh peter@haoduoshipin.com 'source .bashrc && ~/bin/hdsp_deploy.sh'
