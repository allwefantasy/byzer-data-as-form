
v=${1}

if [[ "${v}" == "" ]]
then
  echo "module name is required"
  exit 1
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
cp dev/start.sh release/${v}-bin/bin
cd release
tar czvf ${v}-bin.tar.gz ${v}-bin
cd -
