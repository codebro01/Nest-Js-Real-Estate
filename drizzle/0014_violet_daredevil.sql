CREATE TYPE "public"."IDTypes" AS ENUM('nationalIdCard', 'internationalPassport', 'driversLicense', 'votersCard');--> statement-breakpoint
CREATE TYPE "public"."preferredLanguage" AS ENUM('english', 'yoruba', 'hausa', 'igbo');--> statement-breakpoint
CREATE TYPE "public"."proofOfAddressType" AS ENUM('electricityBill', 'waterBill', 'bankStatement');--> statement-breakpoint
CREATE TYPE "public"."propertyType" AS ENUM('residential', 'apartment', 'land', 'commercial', 'newDevelopment', 'shortLet');