#!/bin/bash
set -e

if [ "$JENKINS_BUILD" = "true" ]; then
  WS="${WORKSPACE:-$(pwd)}"
  export AWS_DEFAULT_REGION="${AWS_DEFAULT_REGION:-us-east-1}"
  echo "Jenkins build: using amazon/aws-cli via Docker (EC2 instance role; no local creds). Workspace at /aws in container."
  aws() {
    docker run --rm --network host \
      -v "${WS}:/aws" \
      -e AWS_DEFAULT_REGION \
      amazon/aws-cli "$@"
  }
else
  echo "This isn't a Jenkins build, so we will use the local aws-cli version."
fi

yarn build
docker --version
docker pull golang
## copied from ecr instructions
aws --version
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 268215509542.dkr.ecr.us-east-1.amazonaws.com
docker build -t 1stdibs-recess .
docker tag 1stdibs-recess:latest 268215509542.dkr.ecr.us-east-1.amazonaws.com/1stdibs-recess:latest
docker push 268215509542.dkr.ecr.us-east-1.amazonaws.com/1stdibs-recess:latest
#
## ecs deploy one-liner from Joey
aws --region us-east-1 ecs update-service --service recess-service --cluster recess-cluster --force-new-deployment
