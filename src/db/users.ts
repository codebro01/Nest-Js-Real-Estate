import {
  integer,
  pgTable,
  varchar,
  uuid,
  text,
  timestamp,
  pgEnum,
  boolean,
} from 'drizzle-orm/pg-core';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export const IDTypes = pgEnum('IDTypes', [
  'nationalIdCard',
  'internationalPassport',
  'driversLicense',
  'votersCard',
]);
export const proofOfAddressType = pgEnum('proofOfAddressType', [
  'electricityBill',
  'waterBill',
  'bankStatement',
]);
export const propertyType = pgEnum('propertyType', [
  'residential',
  'apartment',
  'land',
  'commercial',
  'newDevelopment',
  'shortLet',
]);
export const preferredLanguageType = pgEnum('preferredLanguage', [
  'english',
  'yoruba',
  'hausa',
  'igbo',
]);
export const contactFrequencyType = pgEnum('contactFrequencyType', [
  'daily',
  'weekly',
  'monthly',
]);
export const profileVisibilityType = pgEnum('profileVisibilityType', [
  'public',
  'limited',
  'private',
]);

export const usersTable = pgTable('users', {
  id: uuid().defaultRandom().primaryKey().notNull(),
  displayName: varchar('displayName', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  role: varchar('role', { length: 10 }).default('buyer').notNull(),
  password: varchar('password', { length: 255 }).default('12345').notNull(),
  emailVerified: boolean('is_email_Verified').default(false).notNull(),
  firstname: varchar('firstname', { length: 255 }),
  lastname: varchar('lastname', { length: 255 }),
  dateOfBirth: varchar('date_of_birth', { length: 20 }), // can use date type if preferred
  gender: varchar('gender', { length: 20 }),
  dp: varchar('dp', { length: 255 }),
  phone: varchar('phone', { length: 50 }),
  authProvider: varchar('authProvider', { length: 20 })
    .default('local')
    .notNull(),
  isStageComplete: boolean('is_stage_complete').default(false), 
  refreshToken: varchar('refreshToken', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
export const usersVerificationTable = pgTable('usersVerification', {
  id: uuid().defaultRandom().primaryKey().notNull(),
  userId: uuid('user_id')
    .references(() => usersTable.id)
    .notNull().unique(),

  // !------------ Stage 2: Contact Info ----------------
  idType: IDTypes('id_type').notNull(),
  idFront: varchar('id_front', { length: 50 }).notNull(),
  idBack: varchar('id_back', { length: 50 }).notNull(),
  proofOfAddressType: proofOfAddressType('proof_of_address_type').notNull(),
  isPhoneNumberVerified: boolean('is_phone_number_verified')
    .default(false)
    .notNull(),
  address: text('address'),
  city: varchar('city', { length: 50 }),
  country: varchar('country', { length: 50 }),
  postalCode: varchar('postal_code', { length: 20 }),
  isStageComplete: boolean('is_stage_complete').default(false).notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
export const usersPreferencesTable = pgTable('usersPreferences', {
  id: uuid().defaultRandom().primaryKey().notNull(),
  userId: uuid('user_id')
    .references(() => usersTable.id)
    .notNull().unique(),
  propertyType: propertyType('property_type').array().notNull(),
  minBudgetRange: integer('min_budget').default(0).notNull(),
  preferredLocation: varchar('preferred_location').notNull(),
  numberOfBedrooms: varchar('number_of_bedrooms', { length: 50 }).array(),
  newPropertyAlert: boolean('new_property_alert').default(false),
  priceChangeNotifications: boolean('price_change_notifications').default(
    false,
  ),
  marketUpdatesAndNews: boolean('market_updates_and_news').default(true),
  investmentOpportunities: boolean('investment_opportunities').default(false),
  preferredLanguage: preferredLanguageType('preferred_language')
    .default('english')
    .notNull(),
  contactFrequency: contactFrequencyType('contact_frequency')
    .default('weekly')
    .notNull(),
  profileVisibility: profileVisibilityType('profile_visibility')
    .default('public')
    .notNull(),
  isStageComplete: boolean('is_stage_complete').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type UserType = InferInsertModel<typeof usersTable>;
export type UserVerificationInsertType = InferInsertModel<typeof usersVerificationTable>;
export type UserVerificationSelectType = InferSelectModel<typeof usersVerificationTable>;
export type usersPreferencesInsertType = InferInsertModel<typeof usersPreferencesTable>;
export type usersPreferencesSelectType = InferSelectModel<typeof usersPreferencesTable>;
