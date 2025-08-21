// src/db/db.provider.ts
import { Provider } from '@nestjs/common';
import { db } from '@src/db';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@src/db/schema';

export const DbProvider: Provider<NodePgDatabase<typeof schema>> = {
  provide: 'DB',
  useFactory: () => db,
};
