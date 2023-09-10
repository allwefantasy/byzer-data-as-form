   # set BYZER_HOME
if [ -z $BYZER_FORM_HOME ];then
   export BYZER_FORM_HOME=$(cd -P -- "$(dirname -- "$0")"/../ && pwd -P)
fi

echo "BYZER_FORM_HOME: ${BYZER_FORM_HOME}"

cd $BYZER_FORM_HOME

if [[ -f pid ]];then
  echo "Byzer Form is running, stop it first"
  kill -9 `cat pid`
  rm -rf pid
fi

sleep 3

echo "start Byzer Form"
nohup java -cp .:lib/* tech.mlsql.app_runtime.plugin.App >> ${BYZER_FORM_HOME}/logs/byzer-form.out &
echo $! >> ${BYZER_FORM_HOME}/pid

sleep 3

[ ! -f "${BYZER_FORM_HOME}/pid" ] && quit "Byzer Form start failed, check via log: ${BYZER_FORM_HOME}/logs/byzer-form.out."

PID=$(cat ${BYZER_FORM_HOME}/pid)
CUR_DATE=$(date "+%Y-%m-%d %H:%M:%S")
echo $CUR_DATE" new Byzer Form process pid is "$PID >> ${BYZER_FORM_HOME}/logs/serviceframework-0.log


