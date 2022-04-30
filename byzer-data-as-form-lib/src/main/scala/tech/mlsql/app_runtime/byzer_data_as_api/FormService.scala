package tech.mlsql.app_runtime.byzer_data_as_api

import net.csdn.ServiceFramwork
import net.csdn.common.settings.Settings
import tech.mlsql.app_runtime.byzer_data_as_api.PluginDB.ctx
import tech.mlsql.app_runtime.byzer_data_as_api.PluginDB.ctx._
import tech.mlsql.app_runtime.byzer_data_as_api.action.{DataAsFormAction, ExtensionItem}
import tech.mlsql.app_runtime.byzer_data_as_api.quill_model.ByzerPluginType.ByzerPluginType
import tech.mlsql.app_runtime.byzer_data_as_api.quill_model.{ByzerPluginType, PluginStoreItem, PluginUser}
import tech.mlsql.app_runtime.user.action.UserQuery
import tech.mlsql.app_runtime.user.quill_model.User
import tech.mlsql.common.utils.serder.json.JSONTool

object FormService {

  object Config {
    val PLUGIN_CONFIG_KEY = s"${PluginDB.plugin_name}__config"
  }

  def listPlugins = {
    ctx.run(ctx.query[PluginStoreItem]).toList
  }

  def findPlugin(pluginName: String, version: String, pluginType: ByzerPluginType) = {
    ctx.run(findPluginCriteria(pluginName, version, pluginType)).headOption
  }

  def domain() = {
    val settings = ServiceFramwork.injector.getInstance(classOf[Settings])
    settings.get("domain", "http://market.byzer.org/form")
  }

  def toExtensionItem(item: PluginStoreItem) = {
    ExtensionItem(
      id = item.id,
      userName = item.userName,
      name = item.name,
      downloadUrl = s"${FormService.domain()}/run?action=${DataAsFormAction.action}&pluginName=${item.name}&version=${item.version}&pluginType=${ByzerPluginType.toStr(item.pluginType)}",
      imgUrl = FormService.domain().stripSuffix("/") + "/" + item.img,
      version = item.version,
      desc = item.description,
      downloads = item.downloads,
      views = item.views,
      pluginType = ByzerPluginType.toStr(item.pluginType),
      mainClass = item.mainClass,
      extraParams = item.extraParams
    )

  }


  def findPluginCriteria(pluginName: String, version: String, pluginType: ByzerPluginType) = {
    quote {
      ctx.query[PluginStoreItem].filter { item =>
        item.name == lift(pluginName) && item.version == lift(version) && item.pluginType == lift(pluginType.id)
      }
    }
  }

  def saveUploadInfo(user: String,
                     pluginName: String,
                     mainClass: String,
                     jarPath: String,
                     imgFile: String,
                     desc: String,
                     version: String,
                     pluginType: ByzerPluginType,
                     extraParams: String = "{}") = {

    def findRelate(userId: Int, pluginId: Int) = {
      quote {
        ctx.query[PluginUser].filter { item =>
          item.userId == lift(userId) &&
            item.pluginId == lift(pluginId) &&
            item.relateType == lift(0)
        }
      }
    }

    val criteria = findPluginCriteria(pluginName, version, pluginType)
    val userStr = new UserQuery().run(Map("userName" -> user))
    val userRef = JSONTool.parseJson[List[User]](userStr).head
    ctx.run(
      criteria
    ).headOption match {
      case Some(plugin) =>

        // ctx.run(criteria.update(_.path -> lift(jarPath), _.extraParams -> lift(extraParams)))
        false
      case None =>
        ctx.transaction {
          val pluginId = ctx.run(ctx.query[PluginStoreItem].insert(
            _.name -> lift(pluginName),
            _.userName -> lift(user),
            _.path -> lift(jarPath),
            _.img -> lift(imgFile),
            _.version -> lift(version),
            _.pluginType -> lift(pluginType.id),
            _.description -> lift(desc),
            _.extraParams -> lift(extraParams),
            _.views -> lift(0),
            _.downloads -> lift(0),
            _.mainClass -> lift(mainClass)
          ).returningGenerated(_.id))

          ctx.run(ctx.query[PluginUser].insert(
            _.userId -> lift(userRef.id),
            _.relateType -> lift(0),
            _.pluginId -> lift(pluginId)
          ))
        }
        true
    }
  }

}
