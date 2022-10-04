package tech.mlsql.app_runtime.plugin

import tech.mlsql.app_runtime.byzer_data_as_api.action.{AddNewFormAction, DataAsFormAction, GetSKUWraperAction, ListSKUWrapperAction, UploadExtensionFields_file, UploadImageToBase64}
import tech.mlsql.serviceframework.platform.{Plugin, PluginItem}

/**
 * 18/9/2021 WilliamZhu(allwefantasy@gmail.com)
 */
class ByzerDataAsApiPluginDesc extends Plugin {
  override def entries: List[PluginItem] = {
    List(
      DataAsFormAction.plugin,
      AddNewFormAction.plugin,
      ListSKUWrapperAction.plugin,
      GetSKUWraperAction.plugin,
      UploadExtensionFields_file.plugin,
      UploadImageToBase64.plugin
    )
  }
}
