import { createConnection } from 'typeorm';
import * as path from "path"
import { User } from "../user/user.entity"

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
      type: "sqlite",
      database: `${path.resolve(__dirname, "..")}/data/concruise.sqlite`,
      entities: [ User ],
      logging: true
    }),
  },
];