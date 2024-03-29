package tech.mlsql.app_runtime.byzer_data_as_api.action

import net.csdn.ServiceFramwork
import net.csdn.common.Base64
import net.csdn.common.settings.Settings
import org.apache.commons.compress.utils.IOUtils
import org.apache.commons.fileupload.FileItem
import org.apache.commons.io.FileUtils
import tech.mlsql.app_runtime.byzer_data_as_api.{ContextService, FormService}
import tech.mlsql.app_runtime.byzer_data_as_api.PluginDB.ctx
import tech.mlsql.app_runtime.byzer_data_as_api.PluginDB.ctx._
import tech.mlsql.app_runtime.byzer_data_as_api.action.DeleteFormAction.Params
import tech.mlsql.app_runtime.byzer_data_as_api.quill_model.{ByzerPluginType, PluginStoreItem}
import tech.mlsql.app_runtime.user.action.{ActionHelper, UserService}
import tech.mlsql.common.utils.distribute.socket.server.JavaUtils
import tech.mlsql.common.utils.path.PathFun
import tech.mlsql.common.utils.serder.json.JSONTool
import tech.mlsql.serviceframework.platform.action.ActionContext
import tech.mlsql.serviceframework.platform.form.{Dynamic, FormParams, Input, KV, Select, Upload}
import tech.mlsql.serviceframework.platform.{PluginItem, PluginType}

import java.io.File
import java.util.UUID
import scala.collection.JavaConverters._
import scala.collection.mutable.ArrayBuffer

case class SKU(id: Int, name: String, label: String, desc: String, userName: String, downloads: String, image: String,
               categories: Array[String], mainPage: Option[String])

case class ExtensionItem(id: Int, userName: String,
                         name: String,
                         downloadUrl: String,
                         imgUrl: String,
                         version: String,
                         desc: String,
                         downloads: Int,
                         views: Int,
                         pluginType: String,
                         mainClass: String,
                         extraParams: String
                        )


class AddNewFormAction extends ActionRequireLogin {
  override def _run(params: Map[String, String]): String = {
    import AddNewFormAction.Params
    val name = params(Params.NAME.name)
    val notebookId = params(Params.NOTEBOOK_ID.name)
    val desc = params(Params.DESCRIPTION.name)
    val userName = getUserName(params)
    val imgPath = params(Params.IMG_FILE.name)
    val saveSuccess = FormService.saveUploadInfo(userName, name, notebookId, "", imgPath, desc, "", ByzerPluginType.BYZER_DATA_FORM,
      JSONTool.toJsonStr(
        params - ActionRequireLogin.Params.ADMIN_TOKEN.name - UserService.Config.LOGIN_TOKEN
      ))
    if (saveSuccess) {
      ActionHelper.msg("Save form success")
    } else {
      ActionHelper.msg("Form have the same name exists")
    }

  }

  override def _help(params: Map[String, String]): String = {
    JSONTool.toJsonStr(FormParams.toForm(AddNewFormAction.Params).toList.reverse)
  }
}


class ListFormActionByUser extends BaseAction {
  override def _run(params: Map[String, String]): String = {
    val userName = getUserName(params)
    val items = ctx.run(ctx.query[PluginStoreItem].filter(_.userName == lift(userName)))
    val finalResult = items.map(item => FormService.toExtensionItem(item)).toList
    JSONTool.toJsonStr(finalResult)
  }

  override def _help(params: Map[String, String]): String = {
    JSONTool.toJsonStr(FormParams.toForm(ListFormActionByUser.Params).toList.reverse)
  }
}

object ListFormActionByUser {
  object Params {

  }

  def action = "/user/form/list"

  def plugin = PluginItem(ListFormActionByUser.action, classOf[ListFormActionByUser].getName, PluginType.action, None)
}


class DeleteFormAction extends BaseAction {
  override def _run(params: Map[String, String]): String = {

    val userName = getUserName(params)
    val formName = params(Params.FORM_NAME.name)
    ctx.run(ctx.query[PluginStoreItem].filter(_.userName == lift(userName)).filter(_.name == lift(formName)).delete)
    JSONTool.toJsonStr(Map("msg" -> s"Delete ${formName} success"))
  }

  override def _help(params: Map[String, String]): String = {
    val userName = getUserName(params)
    ContextService.setContext(ContextService(userName = userName))
    JSONTool.toJsonStr(FormParams.toForm(DeleteFormAction.Params).toList.reverse)
  }
}

object DeleteFormAction {
  object Params {
    val FORM_NAME = Select("formName", List(), valueProvider = Option(() => {
      val userName = ContextService.getContextUserName
      new ListFormActionByUser()._run(Map(
        UserService.Config.USER_NAME -> userName
      )) match {
        case s: String =>
          val items = JSONTool.parseJson[List[ExtensionItem]](s)
          items.map(item => KV(Option(item.name), Option(item.name)))
      }
    }), options = Map("label" -> "Form Name"))
  }

  def action = "/form/delete"

  def plugin = PluginItem(DeleteFormAction.action, classOf[DeleteFormAction].getName, PluginType.action, None)
}


object AddNewFormAction {
  object Params {
    val NAME = Input("name", "")
    val NOTEBOOK_ID = Input("notebookId", "")
    val DESCRIPTION = Input("desc", "")
    val IMG_FILE = Upload("imgFile", valueProviderName = UploadExtensionFields_file.action, options = Map("label" -> "Image File"))

  }

  def action = "/form/add"

  def plugin = PluginItem(AddNewFormAction.action, classOf[AddNewFormAction].getName, PluginType.action, None)
}

class UploadImageToBase64 extends ActionRequireLogin {

  import UploadImageToBase64._

  override def _run(params: Map[String, String]): String = {
    val actionContext = ActionContext.context()
    val items = actionContext.others(ActionContext.Config.formItems).asInstanceOf[java.util.List[FileItem]]
    if (items.size() != 1) {
      render(400, ActionHelper.msg("Only support one file to upload"))
    }
    val paths = ArrayBuffer[Map[String, String]]()
    try {
      items.asScala.filterNot(f => f.isFormField).map {
        item =>
          val fileSize = item.getSize
          if (fileSize > fileMaxSize) {
            render(400, ActionHelper.msg(s"File size is limited as ${fileMaxSize / 1024 / 1024}m"))
          }
          val fileContent = IOUtils.toByteArray(item.getInputStream)
          val fileStr = Base64.encodeBytes(fileContent)
          paths += Map("path" -> fileStr)
      }
    } catch {
      case e: Exception =>
        throw e
    }
    JSONTool.toJsonStr(paths)
  }

  override def _help(params: Map[String, String]): String = JSONTool.toJsonStr(
    FormParams.toForm(UploadExtensionFields_file.Params).toList.reverse)
}

object UploadImageToBase64 {

  object Params {}

  def repo = ServiceFramwork.injector.getInstance(classOf[Settings]).get("storage", ".")

  def action = "uploadImageToBase64"

  def fileMaxSize = {
    val size = ServiceFramwork.injector.getInstance(classOf[Settings]).get("imageSizeLimit", "3m")
    val targetSize = JavaUtils.byteStringAsBytes(size)
    targetSize
  }

  def plugin = PluginItem(UploadImageToBase64.action,
    classOf[UploadImageToBase64].getName, PluginType.action, None)

}

class UploadExtensionFields_file extends ActionRequireLogin {

  import UploadExtensionFields_file._

  override def _run(params: Map[String, String]): String = {
    val actionContext = ActionContext.context()
    val items = actionContext.others(ActionContext.Config.formItems).asInstanceOf[java.util.List[FileItem]]
    if (items.size() != 1) {
      render(400, ActionHelper.msg("Only support one file to upload"))
    }
    val paths = ArrayBuffer[Map[String, String]]()
    try {
      val repoLocation = UploadExtensionFields_file.repo
      items.asScala.filterNot(f => f.isFormField).map {
        item =>
          val fileSize = item.getSize
          if (fileSize > fileMaxSize) {
            render(400, ActionHelper.msg(s"File size is limited as ${fileMaxSize / 1024 / 1024}m"))
          }
          val newFileName = UUID.randomUUID().toString.replaceAll("-", "") + "." + item.getFieldName.split("\\.").last
          val tempFilePath = PathFun(repoLocation).add("files").add("images").add(newFileName).toPath

          val relativePath = "files" + PathFun.pathSeparator + "images" + PathFun.pathSeparator + newFileName

          val fileContent = item.getInputStream()
          val targetPath = new File(tempFilePath)
          FileUtils.copyInputStreamToFile(fileContent, targetPath)
          fileContent.close()
          paths += Map("path" -> relativePath)
      }
    } catch {
      case e: Exception =>
        throw e
    }
    JSONTool.toJsonStr(paths)
  }

  override def _help(params: Map[String, String]): String = JSONTool.toJsonStr(
    FormParams.toForm(UploadExtensionFields_file.Params).toList.reverse)
}

object UploadExtensionFields_file {

  object Params {}

  def repo = ServiceFramwork.injector.getInstance(classOf[Settings]).get("storage", ".")

  def action = "uploadExtensionFields_file"

  def fileMaxSize = {
    val size = ServiceFramwork.injector.getInstance(classOf[Settings]).get("fileSizeLimit", "100m")
    val targetSize = JavaUtils.byteStringAsBytes(size)
    targetSize
  }

  def plugin = PluginItem(UploadExtensionFields_file.action,
    classOf[UploadExtensionFields_file].getName, PluginType.action, None)

}


class SearchFormAction extends ActionWithoutLoginRequire {
  override def _run(params: Map[String, String]): String = {
    import SearchFormAction.Params
    val pageNum = params.getOrElse(Params.PAGE_NUM.name, "1").toInt
    val pageSize = params.getOrElse(Params.PAGE_SIZE.name, "10").toInt

    val keyword = params.getOrElse(Params.SEARCH_KEY_WORDS.name, "")

    val filterByKeyword = if (keyword != "") {
      quote {
        (c: PluginStoreItem) => {
          c.name.like(lift(s"%${keyword}%")) || c.description.like(lift(s"%${keyword}%"))
        }
      }
    } else {
      quote {
        (c: PluginStoreItem) => true
      }
    }

    val offset = pageSize * (pageNum - 1)
    val result = ctx.run(ctx.query[PluginStoreItem].
      filter(item => filterByKeyword(item)).
      drop(lift(offset)).
      take(lift(pageSize)))


    val finalResult = result.map { item =>
      FormService.toExtensionItem(item)
    }
    JSONTool.toJsonStr(finalResult)
  }

  override def _help(params: Map[String, String]): String = {
    JSONTool.toJsonStr(FormParams.toForm(SearchFormAction.Params).toList.reverse)
  }
}

object SearchFormAction {
  object Params {
    val SEARCH_KEY_WORDS = Input("keyword", "")

    val PAGE_NUM = Input("pageNum", "1")
    val PAGE_SIZE = Input("pageSize", "10")
  }

  def action = "/form/search"

  def plugin = PluginItem(SearchFormAction.action, classOf[SearchFormAction].getName, PluginType.action, None)
}


class ListSKUWrapperAction extends ActionWithoutLoginRequire {
  override def _run(params: Map[String, String]): String = {
    val itemsJson = new SearchFormAction()._run(params)
    val items = JSONTool.parseJson[List[ExtensionItem]](itemsJson)
    val res = items.map { item =>
      SKU(id = item.id, name = item.name, label = item.name,
        desc = item.desc,
        userName = item.userName,
        downloads = item.downloads.toString,
        image = (if (item.imgUrl == "") "/images/byzer-lang.png" else item.imgUrl),
        categories = Array(item.pluginType), mainPage = None)
    }
    JSONTool.toJsonStr(res)
  }

  override def _help(params: Map[String, String]): String = {
    JSONTool.toJsonStr(FormParams.toForm(ListSKUWrapperAction.Params).toList.reverse)
  }
}

object ListSKUWrapperAction {

  object Params {

  }

  def action = "/home/list"

  def plugin = PluginItem(ListSKUWrapperAction.action, classOf[ListSKUWrapperAction].getName, PluginType.action, None)
}


class GetSKUWraperAction extends ActionRequireLogin {
  override def _run(params: Map[String, String]): String = {
    val id = params("extra.id").toInt
    val extension = ctx.run(ctx.query[PluginStoreItem].filter(_.id == lift(id))).headOption
    val res = new DataAsFormAction()._run(params ++ Map(
      "extra.notebookId" -> extension.get.mainClass))
    res
  }

  override def _help(params: Map[String, String]): String = {
    val id = params("extra.id").toInt
    val extension = ctx.run(ctx.query[PluginStoreItem].filter(_.id == lift(id))).headOption
    new DataAsFormAction()._help(params ++ Map(
      "extra.notebookId" -> extension.get.mainClass))
  }
}

object GetSKUWraperAction {

  object Params {

  }

  def action = "/sku/get"

  def plugin = PluginItem(GetSKUWraperAction.action, classOf[GetSKUWraperAction].getName, PluginType.action, None)
}
