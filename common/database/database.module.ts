import { Module } from "@nestjs/common";
// import { envConfig } from 'src/config/env';
import { DataSource } from "typeorm";
import { DatabaseService } from "./database.service";

const dbOptions = {
  //this name refers to connection name but for consistency purpose Database is same as connection name.
  name: "microservice",
  type: "postgres" as any,
  host: "localhost",
  port: 5432,
  username: "dharmil",
  password: "Dharmil@1225",
  database: "microservice",
};

export const connection = new DataSource({
  ...dbOptions,
  entities: [__dirname + "/entities/*.entity{.ts,.js}"],
  migrations: [__dirname + "/migrations/*{.ts,.js}"],
  synchronize: false,
  logging: true,
  applicationName: "web_backend",
  migrationsTableName: "migrations",
});

export const databaseProvider = [
  {
    provide: "DATA_SOURCE",
    useFactory: async () => {
      return await connection.initialize();
    },
  },
  DatabaseService,
];

@Module({
  providers: databaseProvider,
  exports: databaseProvider,
})
export class DatabaseModule {}
