#!/usr/bin/env bash

scp -r dist haoduoshipin.com:
ssh peter@haoduoshipin.com 'source .bashrc && ~/bin/hdsp_deploy.sh'
