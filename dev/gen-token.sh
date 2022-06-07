#!/bin/bash

secretKey="${1}"
if [[  "${secretKey}" == "" ]];then
  echo "example: ./bin/gen-token.sh [secret key configured in config/notebook.properties]"
  exit 1
fi

java -cp .:lib/* tech.mlsql.app_runtime.plugin.GenToken ${secretKey}