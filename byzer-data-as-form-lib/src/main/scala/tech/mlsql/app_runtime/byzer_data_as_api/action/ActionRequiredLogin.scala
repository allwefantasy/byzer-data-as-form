package tech.mlsql.app_runtime.byzer_data_as_api.action

import tech.mlsql.app_runtime.db.service.BasicDBService
import tech.mlsql.app_runtime.user.action.UserService
import tech.mlsql.common.utils.serder.json.JSONTool
import tech.mlsql.serviceframework.platform.form.Input

abstract class ActionRequireLogin extends BaseAction {

  override def run(params: Map[String, String]): String = {
    val token = params.getOrElse(ActionRequireLogin.Params.ADMIN_TOKEN.name, "")
    if (BasicDBService.adminToken == token) {
      return _run(params)
    }

    val userName = getUserName(params)

    val loginToken = params.getOrElse(UserService.Config.LOGIN_TOKEN, "")
    if (UserService.isLogin(userName, loginToken).size > 0) {
      if (params.contains(ActionRequireLogin.Params.HELP.name)) {
        _help(params)
      } else {
        _run(params)
      }

    } else {
      render(401, JSONTool.toJsonStr(List(Map("msg" -> "Login or AdminToken is required"))))
    }

  }

}

object ActionRequireLogin {

  object Params {
    val HELP = Input("__HELP__", "")
    val ADMIN_TOKEN = Input("admin_token", "")
  }

}
