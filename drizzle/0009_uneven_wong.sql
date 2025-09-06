ALTER TABLE "users" DROP CONSTRAINT "users_displayName_unique";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "firstname" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "lastname" DROP NOT NULL;