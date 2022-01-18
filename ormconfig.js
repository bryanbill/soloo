const { Config } = require("@foal/core");
const fs = require("fs");
module.exports = {
  type: Config.getOrThrow("database.type", "string"),

  url: Config.get("database.url", "string"),
  host: Config.get("database.host", "string"),
  port: Config.get("database.port", "number"),
  username: Config.get("database.username", "string"),
  password: Config.get("database.password", "string"),
  database: Config.get("database.database", "string"),
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  
  //For secure connection:
  ssl: {
    ca: fs.readFileSync("/home/admin/databases/certs/ca.crt").toString(),
    key: fs.readFileSync("/home/admin/databases/my-safe-directory/ca.key").toString(),
  },
  dropSchema: Config.get("database.dropSchema", "boolean", false),
  synchronize: Config.get("database.synchronize", "boolean", true),

  entities: ["build/app/**/*.entity.js"],
  migrations: ["build/migrations/*.js"],
  cli: {
    migrationsDir: "src/migrations",
  },
};
