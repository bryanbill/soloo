import "source-map-support/register";

// std
import * as http from "http";

// 3p
import { Config, createApp, displayServerURL } from "@foal/core";

// App
import { AppController } from "./app/app.controller";
import express = require("express");
import cors from "cors";
async function main() {
  const expressApp = express();
  expressApp.use(
    cors({
      origin: "http://localhost:*",
      credentials: true,
    })
  );
  const app = await createApp(AppController, {
    expressInstance: expressApp,
  });

  const httpServer = http.createServer(app);
  const port = Config.get("port", "number", 3001);
  httpServer.listen(port, () => displayServerURL(port));
}

main().catch((err) => {
  console.error(err.stack);
  process.exit(1);
});
