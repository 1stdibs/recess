#!/bin/bash
set -e
# make sure docker is running

yarn build
docker --version
docker pull golang
# copied from ecr instructions
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 268215509542.dkr.ecr.us-east-1.amazonaws.com
docker build -t 1stdibs-recess .
docker tag 1stdibs-recess:latest 268215509542.dkr.ecr.us-east-1.amazonaws.com/1stdibs-recess:latest
docker push 268215509542.dkr.ecr.us-east-1.amazonaws.com/1stdibs-recess:latest

# ecs deploy one-liner from Joey
aws --region us-east-1 ecs update-service --service recess-service --cluster recess-cluster --force-new-deployment
