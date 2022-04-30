package tech.mlsql.app_runtime.byzer_data_as_api.quill_model

case class PluginStoreItem(id: Int,
                           name: String,
                           userName: String,
                           mainClass: String,
                           path: String,
                           version: String,
                           img: String,
                           description: String,
                           downloads: Int,
                           views: Int,
                           pluginType: Int,
                           extraParams: String)

case class PluginUser(id: Int, userId: Int, pluginId: Int, relateType: Int)

object ByzerPluginType extends Enumeration {
  type ByzerPluginType = Value

  val BYZER_DATA_FORM = Value(3)

  def from(str: String) = {
    str match {
      case "byzer_data_form" => ByzerPluginType.BYZER_DATA_FORM
    }
  }

  def toStr(value: Int) = {
    value match {
      case 3 => "byzer_data_form"
    }
  }

}
