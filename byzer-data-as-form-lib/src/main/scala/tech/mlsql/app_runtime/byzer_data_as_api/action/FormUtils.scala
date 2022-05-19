package tech.mlsql.app_runtime.byzer_data_as_api.action

import net.sf.json.JSONObject
import tech.mlsql.common.utils.serder.json.JSONTool
import tech.mlsql.serviceframework.platform.form.{Input, KV, Select}

import scala.collection.JavaConverters._
import scala.collection.mutable.ArrayBuffer

/**
 * 8/2/2022 WilliamZhu(allwefantasy@gmail.com)
 */
object FormUtils {
  def toFormField(field: ByzerLangFormField): Product = {
    field.option("formType") match {
      case "input" =>
        //set field1="" where type="defaultParam" and formType="input";
        Input(field.key, "", options = field.option)
      case "select" =>
        //  set field1="" where type="defaultParam" and formType="select" and sqlProvider="select a as value from ..."
        // textProvider="a,b,c";
        val values = ArrayBuffer[KV]()
        field.option.get("textProvider") match {
          case Some(item) =>
            val Array(k, v) = item.split(";")
            (k.split(",")).zip(v.split(",")).foreach { case (k, v) =>
              values += KV(Option(k), Option(v))
            }
          case None =>
            val sql = field.option.get("sqlProvider").get
            val runScript = new RunScript(Map())
            val content = runScript.includeSchema(false).owner("robot").sql(sql).execute()
            JSONTool.jParseJsonArray(content).asScala.map { item =>
              (item.asInstanceOf[JSONObject].get("key").toString, item.asInstanceOf[JSONObject].get("value").toString)
            }.foreach { case (k, v) =>
              values += KV(Option(k), Option(v))
            }
        }

        val a = Select(field.key, List(), valueProvider = Option(() => {
          values.toList
        }), options = field.option)

        a.copy(values = a.valueProvider.map(_.apply()).getOrElse(List()))
      case "title" =>
        Title(field.key, field.command)
    }

  }


}

case class Title(name: String, value: String, tpe: String = "Title", @transient valueProvider: Option[() => String] = None, options: Map[String, String] = Map())
