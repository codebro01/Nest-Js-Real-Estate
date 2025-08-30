import { integer, pgTable, varchar, uuid, date, text, timestamp } from 'drizzle-orm/pg-core';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export const usersTable = pgTable('users', {
  id: uuid().defaultRandom().primaryKey().notNull(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  role: varchar('role', { length: 10 }).notNull(),
  
  // ! ------------ stage 1: Profile into -----------------
  firstname: varchar('firstname', { length: 255 }).notNull(),
  lastname: varchar('lastname', { length: 255 }).notNull(),
  dateOfBirth: varchar('date_of_birth', { length: 20 }), // can use date type if preferred
  gender: varchar('gender', { length: 20 }),

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

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type User = InferSelectModel<typeof usersTable>;
export type UserType = InferInsertModel<typeof usersTable>;
