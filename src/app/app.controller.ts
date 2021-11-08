import { Config, controller, IAppController } from "@foal/core";
import process = require("process");
import { createConnection } from "typeorm";

import { ApiController, OpenapiController } from "./controllers";

export class AppController implements IAppController {
  subControllers = [
    controller(`/${Config.get("version", "string", "v1")}`, ApiController),
    controller("/swagger", OpenapiController),
  ];

  async destroy() {
    process.exit(0);
  }

  async init() {
    await createConnection();
  }
}
