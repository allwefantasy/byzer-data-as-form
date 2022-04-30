package tech.mlsql.app_runtime.plugin

import tech.mlsql.app_runtime.byzer_data_as_api.action.DataAsFormAction
import tech.mlsql.serviceframework.platform.{Plugin, PluginItem}

class PluginDesc extends Plugin {
  override def entries: List[PluginItem] = {
    List(DataAsFormAction.plugin)
  }
}
