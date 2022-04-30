package tech.mlsql.app_runtime.byzer_data_as_api

import net.csdn.jpa.QuillDB
import tech.mlsql.app_runtime.db.quill_model.DictType
import tech.mlsql.app_runtime.db.service.BasicDBService


object PluginDB {
  val plugin_name = "byzer-data-as-api"
  lazy val ctx = {
    val dbName = BasicDBService.fetch(plugin_name, DictType.INSTANCE_TO_DB)
    if (dbName.isDefined) {
      val dbInfo = dbName.getOrElse {
        throw new RuntimeException(s"DB: cannot init db for plugin ${plugin_name} ")
      }
      val dbConfig = BasicDBService.fetchDB(dbInfo.value).getOrElse {
        throw new RuntimeException(s"DB: cannot get db config for plugin ${plugin_name} ")
      }
      QuillDB.createNewCtxByNameFromStr(dbConfig.name, dbConfig.value)
    } else {
      QuillDB.ctx
    }
  }
}
