import { integer, pgTable, varchar, uuid } from 'drizzle-orm/pg-core';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export const usersTable = pgTable('users', {
  id: uuid().defaultRandom().primaryKey(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  firstname: varchar('firstname', { length: 255 }).notNull(),
  lastname: varchar('lastname', { length: 255 }).notNull(),
  age: integer().notNull(),
});

export type User = InferSelectModel<typeof usersTable>;
export type UserType = InferInsertModel<typeof usersTable>;
