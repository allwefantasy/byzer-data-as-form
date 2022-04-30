package tech.mlsql.app_runtime.byzer_data_as_api.app

import tech.mlsql.serviceframework.platform.app.{BeforeHTTPPhase, CustomApp, StartupPhase}

/**
 * 21/1/2020 WilliamZhu(allwefantasy@gmail.com)
 */
class ExampleApp extends CustomApp {
  override def run(params: Map[Any, Any]): Any = ???

  override def phase: StartupPhase = BeforeHTTPPhase
}
