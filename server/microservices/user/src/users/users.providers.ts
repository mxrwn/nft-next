import { Connection } from "mongoose";
import { UserSchema } from "src/schemas/user.schema";

export const catsProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) => connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION']
  }
]