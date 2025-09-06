ALTER TABLE "users" RENAME COLUMN "username" TO "displayName";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_username_unique";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'buyer';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password" SET DEFAULT '12345';--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_displayName_unique" UNIQUE("displayName");