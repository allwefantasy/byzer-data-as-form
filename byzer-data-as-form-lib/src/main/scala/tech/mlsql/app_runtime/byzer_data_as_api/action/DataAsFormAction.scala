package tech.mlsql.app_runtime.byzer_data_as_api.action

import net.csdn.ServiceFramwork
import net.csdn.common.settings.Settings
import net.sf.json.JSONObject
import org.apache.http.client.fluent.Request
import org.apache.http.util.EntityUtils
import tech.mlsql.app_runtime.byzer_data_as_api.PluginDB
import tech.mlsql.app_runtime.byzer_data_as_api.PluginDB.ctx
import tech.mlsql.app_runtime.byzer_data_as_api.PluginDB.ctx._
import tech.mlsql.app_runtime.byzer_data_as_api.hint._
import tech.mlsql.app_runtime.db.service.BasicDBService
import tech.mlsql.app_runtime.user.action._
import tech.mlsql.app_runtime.user.quill_model.{Role, User, UserRole}
import tech.mlsql.common.utils.serder.json.JSONTool
import tech.mlsql.serviceframework.platform.form.{FormParams, Input}
import tech.mlsql.serviceframework.platform.{PluginItem, PluginType}
import tech.mlsql.app_runtime.byzer_data_as_api.PluginDB.ctx
import tech.mlsql.app_runtime.byzer_data_as_api.PluginDB.ctx._
import tech.mlsql.app_runtime.byzer_data_as_api.quill_model.PluginStoreItem

import scala.collection.JavaConverters._

/**
 * Action logical
 */
class DataAsFormAction extends ActionRequireLogin {

  override def _run(params: Map[String, String]): String = {

    val canAccess = DataAsFormService.checkAccess(params)
    if (!canAccess.access) {
      render(403, JSONTool.toJsonStr(Map("msg" -> canAccess.msg)))
    }

    val formFields = DataAsFormService.getByzerLangFormVariables(params).map(_.key).toSet

    val parametersPrefix = (params -
      UserService.Config.LOGIN_TOKEN -
      "action" -
      "userName").
      filterNot(_._1.startsWith("extra.")). // url params should be ignored
      filter(item => formFields.contains(item._1)). // make sure only form field variables are accepted
      map { case (key, value) =>

        val newValue = if (value == null || value.isEmpty) {
          s""" "${value}" """
        } else {
          s""" '''${value}''' """
        }

        s"""
           |set ${key}=${newValue};
           |""".stripMargin
      }.mkString("\n")

    val (owner, rawScript) = DataAsFormService.getNotebookScript(params("extra.notebookId"))
    val script = parametersPrefix + rawScript

    val runScript = new RunScript(Map())
    val result = runScript.owner(owner).
      sql(script).
      execute()
    result
  }

  override def _help(params: Map[String, String]): String = {
    if (params.isEmpty) {
      return JSONTool.toJsonStr(FormParams.toForm(DataAsFormAction.Params).toList.reverse)
    }

    if (params.contains("extra.id")) {
      ctx.run(ctx.query[PluginStoreItem].filter(p => p.id == lift(params("extra.id").toInt)).
        update(p => p.downloads -> (p.downloads + 1)))
    }

    val canAccess = DataAsFormService.checkAccess(params)
    if (!canAccess.access) {
      render(403, JSONTool.toJsonStr(Map("msg" -> canAccess.msg)))
    }

    val formFields = DataAsFormService.getByzerLangFormVariables(params)

    JSONTool.toJsonStr(formFields.map(FormUtils.toFormField(_)))

  }


}

case class ByzerLangFormField(raw: String,
                              key: String,
                              command: String,
                              original_command: String,
                              option: Map[String, String],
                              mode: String)

case class CellInfoDTO(id: String, content: String, job_id: Option[String])

case class NotebookDTO(id: String, name: String, user: String, cell_list: List[CellInfoDTO])

case class RespWrapper(code: String, data: NotebookDTO)

/**
 * Action Info
 */
object DataAsFormAction {

  object Params {
    val ECHO = Input("echo", "")
  }

  def action = "dataAsForm"

  def plugin = PluginItem(DataAsFormAction.action,
    classOf[DataAsFormAction].getName, PluginType.action, None)
}


object DataAsFormService {

  object Config {
    val DataAsForm_KEY = s"${PluginDB.plugin_name}__config__example"
  }

  def getResourceKey(params: Map[String, String]): String = {
    val notebookId = params("extra.notebookId")
    DataAsFormAction.action + "_" + notebookId
  }

  def engineUrl: String = {
    val _settings = ServiceFramwork.injector.getInstance(classOf[Settings])
    _settings.get("engineUrl").stripSuffix("/")
  }

  def notebookUrl: String = {
    val _settings = ServiceFramwork.injector.getInstance(classOf[Settings])
    _settings.get("notebookUrl").stripSuffix("/")
  }

  def getNotebookScript(notebookId: String) = {
    val resp = Request.Get(DataAsFormService.notebookUrl + "/api/service/notebook/" + notebookId).
      addHeader("Authorization", DataAsFormService.getNotebookAccessToken).
      execute().returnResponse()

    val c = new String(EntityUtils.toByteArray(resp.getEntity), "utf-8")
    if (resp.getStatusLine.getStatusCode != 200) {
      throw new RuntimeException(c)
    }
    val notebook = JSONTool.parseJson[RespWrapper](c)
    (notebook.data.user, notebook.data.cell_list.map(cell => convertCellToByzerLang(cell.content)).mkString("\n"))
  }

  def convertCellToByzerLang(content: String) = {
    var newContent = content
    val hintManager = List(
      new PythonHint,
      new JDBCHint,
      new KylinHint,
      new DeployModelHint,
      new DeployScriptHint,
      new DeployPythonModelHint)
    hintManager.foreach { hinter =>
      if (newContent == content) {
        newContent = hinter.rewrite(newContent, Map())
      }
    }
    newContent
  }


  def getNotebookAccessToken: String = {
    val _settings = ServiceFramwork.injector.getInstance(classOf[Settings])
    _settings.get("notebookAccessToken")
  }

  def getByzerlangVariables(params: Map[String, String]) = {
    val (owner, script) = DataAsFormService.getNotebookScript(params("extra.notebookId"))
    val runScript = new RunScript(Map())
    val analyzedContent = runScript.owner(owner).
      sql(script).
      executeMode("analyze").execute()
    JSONTool.jParseJsonArray(analyzedContent).asScala.map(_.asInstanceOf[JSONObject])
  }

  def getByzerLangFormVariables(params: Map[String, String]) = {
    val formFields = getByzerlangVariables(params).filter { temp =>
      temp.containsKey("key") && temp.getJSONObject("option").containsKey("formType")
    }.map(item =>
      JSONTool.parseJson[ByzerLangFormField](item.toString)
    )

    formFields.toList
  }

  def checkAccess(params: Map[String, String]): CanAccess = {
    val visibility = getByzerlangVariables(params).
      filter(item => item.containsKey("key") && item.containsKey("command")).
      filter(_.getString("key") == "FORM_VISIBILITY").headOption
    val msg = "This form is not allowed to visit"
    if (visibility.isEmpty) return CanAccess(false, msg)
    val value = visibility.get.get("command").asInstanceOf[String].stripSuffix("\"").stripPrefix("\"")
    if (value == "__PUBLIC__") return CanAccess(true, "")

    val currentUser = getUser(params)
    if (currentUser.isEmpty) {
      return CanAccess(false, msg)
    }

    if (value.startsWith("user:")) {
      //user:jack,abc
      val Array(_, userNames) = value.split(":", 2)
      val userNamesSet = userNames.split(",").map(_.trim).toSet

      if (userNamesSet.contains(currentUser.get.name)) {
        return CanAccess(true, "")
      }
    }

    if (value.startsWith("team:")) {
      //team:byzer > role:dev,team:byzer > role:admin
      // byzer > dev, byzer> admin
      val teamRoles = value.split(",").map { item =>
        var _team = ""
        var _role = ""
        val Array(team, role) = item.trim.split(">", 2)
        _team = team.trim
        _role = role.trim

        if (team.trim.startsWith("team:")) {
          val Array(_, teamV) = team.trim.split(":", 2)
          val Array(_, roleV) = role.trim.split(":", 2)
          _team = teamV
          _role = roleV
        }

        (_team, _role)
      }

      val teams = getTeams(currentUser.get.id)
      val teamNames = teams.map(_.name).toSet
      val inTargetTeamRoles = teamRoles.filter(team => teamNames.contains(team._1)).map { team =>
        val role = team._2
        val roles = getRoles(teams.filter(_.name == team._1).head.teamId).map(_.name).toSet
        roles.contains(role)
      }.size > 0

      if (inTargetTeamRoles) return CanAccess(true, "")

    }

    CanAccess(false, msg)
  }

  def getRoles(teamId: Int): List[Role] = {
    val roles = ctx.run(
      ctx.query[Role].
        filter(_.teamId == lift(teamId))
    ).toList
    roles
  }

  def getTeams(userId: Int) = {

    val roles = ctx.run(
      ctx.query[UserRole].
        filter(_.userId == lift(userId)).
        join(ctx.query[Role]).on((userRole, role) => userRole.roleId == role.id).
        map { case (userRole, role) => role }.filter(_.name == lift(AddRoleAction.ROLE_ADMIN))
    )

    roles.map(item => item).toList
  }

  def getUser(params: Map[String, String]) = {
    val usersStr = new UserQuery().run(params - "__HELP__")
    val users = JSONTool.parseJson[List[User]](usersStr)
    users.headOption
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


  def checkLoginAndResourceAccess(resourceKey: String, params: Map[String, String]): CanAccess = {
    var canAccess = false

    val token = params.getOrElse("admin_token", "")
    if (BasicDBService.adminToken == token) return CanAccess(true, "")


    val userName = getUserName(params)

    val resourceName = resourceKey
    val resStr = new AccessAuth().run(
      Map(
        "userName" -> userName,
        "resourceName" -> resourceName
      )
    )
    val res = JSONTool.parseJson[CanAccess](resStr)
    canAccess = res.access

    if (canAccess) CanAccess(canAccess, "")
    else CanAccess(canAccess, "No right to access this resource")

  }

}
