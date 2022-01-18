module.export = {
  apps: [
    {
      name: "Soloo-Engine",
      script: "./build/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 4040,
        VERSION: "V1",
        DISK_DRIVER: "local",
        FOAL_DISK_DIRECTORY: "storage",
        JWT_SECRET: "Rnu2BGbD8WC1JzelU5dsXYNzspAA0Dmy8qtlQDOuZtc:",
        JWT_COOKIE_NAME: "soloo",
        JWT_COOKIE_DOMAIN: "soloo.me",
        DATABASE_TYPE: "postgres",
        DB_HOST: "localhost",
        DB_PORT: 5432,
        DB_USERNAME: "soloo",
        DB_PASSWORD: "cocoginger45",
        DB_NAME: "soloo",
      },
    },
  ],
};
