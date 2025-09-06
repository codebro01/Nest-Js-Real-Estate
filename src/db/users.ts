import {
  integer,
  pgTable,
  varchar,
  uuid,
  date,
  text,
  timestamp,
  pgEnum, 
  boolean
} from 'drizzle-orm/pg-core';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';



export const usersTable = pgTable('users', {
  id: uuid().defaultRandom().primaryKey().notNull(),
  displayName: varchar('displayName', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  role: varchar('role', { length: 10 }).default('buyer').notNull(),
  password: varchar('password', { length: 255 }).default('12345').notNull(),
  emailVerified: boolean('emailVerified').default(false).notNull(),
  

  // ! ------------ stage 1: Profile into -----------------
  firstname: varchar('firstname', { length: 255 }),
  lastname: varchar('lastname', { length: 255 }),
  dateOfBirth: varchar('date_of_birth', { length: 20 }), // can use date type if preferred
  gender: varchar('gender', { length: 20 }),
  dp: varchar('dp', { length: 255 }),

  // !------------ Stage 2: Contact Info ----------------
  phone: varchar('phone', { length: 50 }),
  address: text('address'),
  city: varchar('city', { length: 50 }),
  state: varchar('state', { length: 50 }),
  country: varchar('country', { length: 50 }),
  postalCode: varchar('postal_code', { length: 20 }),

  //! ------------- Stage 3: Employment Info ----------------
  occupation: varchar('occupation', { length: 100 }),
  company: varchar('company', { length: 100 }),
  income: integer('income'),

  //! ----------------- Stage 4: Documents ------------------------
  idDocumentUrl: text('id_document_url'), // link to uploaded ID doc
  utilityBillUrl: text('utility_bill_url'), // link to uploaded utility bill
  otherDocs: text('other_docs'), // JSON stringified array of other document links

  //! -------------------- Tracking stages ------------------------
  currentStage: integer('current_stage').default(1).notNull(), // stage user is currently on
  completedStages: integer('completed_stages').default(0).notNull(), // how many stages done

  authProvider: varchar('authProvider', {length:20}).default('local').notNull(), 
  refreshToken: varchar('refreshToken', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type User = InferSelectModel<typeof usersTable>;
export type UserType = InferInsertModel<typeof usersTable>;
