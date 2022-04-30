package tech.mlsql.app_runtime.byzer_data_as_api.action

import tech.mlsql.app_runtime.db.service.BasicDBService
import tech.mlsql.app_runtime.user.action.{UserQuery, UserService}
import tech.mlsql.app_runtime.user.quill_model.User
import tech.mlsql.common.utils.serder.json.JSONTool
import tech.mlsql.serviceframework.platform.action.{ActionContext, CustomAction}
import tech.mlsql.serviceframework.platform.form.Input


abstract class ActionWithoutLoginRequire extends CustomAction {
  override def run(params: Map[String, String]): String = {
    if (params.contains(BaseAction.Params.HELP.name)) {
      _help(params)
    }
    else {
      _run(params)
    }
  }

  def _run(params: Map[String, String]): String

  def _help(params: Map[String, String]): String

  def render(status: Int, content: String): String = {
    val context = ActionContext.context()
    render(context.httpContext.response, status, content)
    ""
  }

  def renderEmpty(): String = {
    render(200, JSONTool.toJsonStr(List(Map())))
    ""
  }
}

abstract class BaseAction extends CustomAction {
  override def run(params: Map[String, String]): String = {
    if (params.contains(BaseAction.Params.HELP.name)) {
      _help(params)
    }
    else {
      val token = params.getOrElse(ActionRequireLogin.Params.ADMIN_TOKEN.name, "")
      if (BasicDBService.adminToken == token) {
        return _run(params)
      }

      val userName = getUserName(params)

      val loginToken = params.getOrElse(UserService.Config.LOGIN_TOKEN, "")
      if (UserService.isLogin(userName, loginToken).size > 0) {
        return _run(params)
      }
      render(400, JSONTool.toJsonStr(List(Map("msg" -> "Login or AdminToken is required"))))
    }
  }

  def _run(params: Map[String, String]): String

  def _help(params: Map[String, String]): String

  def render(status: Int, content: String): String = {
    val context = ActionContext.context()
    render(context.httpContext.response, status, content)
    ""
  }

  def renderEmpty(): String = {
    render(200, JSONTool.toJsonStr(List(Map())))
    ""
  }

  def getUserName(params: Map[String, String]) = {
    val userName = if (params.contains(UserService.Config.USER_ID)) {
      val user = getUser(params)
      user.get.name
    } else {
      params.getOrElse(UserService.Config.USER_NAME, "")
    }
    userName
  }

  def getUser(params: Map[String, String]) = {
    val users = JSONTool.parseJson[List[User]](new UserQuery().run(params))
    users.headOption
  }


  def paramEmptyAsNone(params: Map[String, String], name: String) = {
    params.get(name) match {
      case Some(value) => if (value.isEmpty) None else Some(value)
      case None => None
    }
  }
}

object BaseAction {

  object Params {
    val HELP = Input("__HELP__", "")
    val ADMIN_TOKEN = Input("admin_token", "")
  }

}
