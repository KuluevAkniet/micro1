import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as path from "path";
// import {ENV_FILE_PATH} from "../../main";

// config({
//   path: ENV_FILE_PATH,
// });

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [
    path.join(__dirname, './entities/*.entity{.ts,.js}'),
  ],
  migrations: [
    path.join(__dirname, './*{.ts,.js}')
  ],
  useUTC: true,
});
