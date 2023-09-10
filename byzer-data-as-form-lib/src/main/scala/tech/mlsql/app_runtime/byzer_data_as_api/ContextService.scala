package tech.mlsql.app_runtime.byzer_data_as_api

/**
 * 8/2/2023 WilliamZhu(allwefantasy@gmail.com)
 */

object ContextService {
  private[this] val context: ThreadLocal[ContextService] = new ThreadLocal[ContextService]

  def setContext(contextService: ContextService) = {
    context.set(contextService)
  }

  def getContext: ContextService = {
    context.get()
  }

  def getContextOption: Option[ContextService] = {
    Option(context.get())
  }

  def getContextUserName: String = {
    context.get().userName
  }

  def getContextUserNameOption: Option[String] = {
    Option(context.get()).map(f => f.userName)
  }

  def clearContext() = {
    context.remove()
  }
}

case class ContextService(userName: String)
