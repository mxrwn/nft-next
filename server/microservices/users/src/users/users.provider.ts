import { Connection } from "mongoose";
import { ActivitySchema } from "src/schemas/activity.schema";
import { UserSchema } from "src/schemas/user.schema";

export const UserProvider = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) => connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION']
  },
  {
    provide: 'ACTIVITY_MODEL',
    useFactory: (connection: Connection) => connection.model('Activity', ActivitySchema),
    inject: ['DATABASE_CONNECTION']
  }
]