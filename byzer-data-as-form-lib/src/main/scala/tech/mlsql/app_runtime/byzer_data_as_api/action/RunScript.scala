package tech.mlsql.app_runtime.byzer_data_as_api.action

import org.apache.http.client.fluent.{Form, Request}
import org.apache.http.util.EntityUtils

import java.nio.charset.Charset
import java.util.UUID
import scala.collection.mutable

class RunScript(_params: Map[String, String]) {
  private val extraParams = mutable.HashMap[String, String]()
  extraParams.put("executeMode", "query")
  extraParams.put("sessionPerUser", "true")
  extraParams.put("sessionPerRequest", "true")
  extraParams.put("includeSchema", "true")
  extraParams.put("fetchType", "take")

  def includeSchema(include: Boolean) = {
    extraParams += ("includeSchema" -> include.toString)
    this
  }

  def fetchType(fetchTpe: Boolean) = {
    extraParams += ("fetchType" -> fetchTpe.toString)
    this
  }

  def sql(sql: String) = {
    extraParams += ("sql" -> sql)
    this
  }

  def owner(owner: String) = {
    extraParams += ("owner" -> owner)
    this
  }

  def async(async: Boolean) = {
    extraParams += ("async" -> async.toString)
    this
  }

  def timeout(timeout: Long) = {
    extraParams += ("timeout" -> timeout.toString)
    this
  }

  def executeMode(executeMode: String) = {
    extraParams += ("executeMode" -> executeMode)
    this
  }

  def jobName(jobName: String) = {
    extraParams += ("jobName" -> jobName)
    this
  }


  private def param(str: String) = {
    params().getOrElse(str, null)
  }

  private def hasParam(str: String) = {
    params().contains(str)
  }

  private def params() = {
    _params ++ extraParams
  }

  def execute() = {

    var newparams = params()

    if (!newparams.contains("jobName")) {
      newparams += ("jobName" -> UUID.randomUUID().toString)
    }

    val form = Form.form()
    newparams.foreach { case (k, v) =>
      form.add(k, v)
    }

    val resp = Request.Post(DataAsFormService.engineUrl + "/run/script").
      bodyForm(form.build(), Charset.forName("utf-8")).
      execute().returnResponse()

    val c = new String(EntityUtils.toByteArray(resp.getEntity), "utf-8")
    if (resp.getStatusLine.getStatusCode != 200) {
      throw new RuntimeException(c)
    }
    c
  }


}
