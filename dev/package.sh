#!/usr/bin/env bash

v=${1:-byzer-data-as-form}

if [[ "${v}" == "" ]]
then
  echo "module name is required"
  exit 1
fi

DATA_AS_FORM_HOME=`pwd`

if [[ ! -d deps ]]
then
  mkdir -p  deps
  cd deps

  for item in web-platform app_runtime_with_db user-system ar_runtime_web_console
  do
      echo "clone https://github.com/allwefantasy/${item}"
      git clone https://github.com/allwefantasy/${item}
      echo "installing ${item}"
      cd "$item"
      mvn -DskipTests  install
      cd ..
  done

  cd ${DATA_AS_FORM_HOME}
fi

rm -rf release

VERSION=$(mvn -q \
    -Dexec.executable=echo \
    -Dexec.args='${project.version}' \
    --non-recursive \
    exec:exec)

mvn clean install -DskipTests -Dmaven.javadoc.skip=true
mvn clean package -DskipTests -Dmaven.javadoc.skip=true -Pshade -pl ${v}-bin

mkdir -p release/${v}-bin/lib release/${v}-bin/bin
cp -r config release/${v}-bin/
cp -r ${v}-bin/target/byzer-data-as-api-bin_2.12-${VERSION}.jar release/${v}-bin/lib
cp dev/*.sh release/${v}-bin/bin
cd release
tar czvf ${v}-bin.tar.gz ${v}-bin
cd -
