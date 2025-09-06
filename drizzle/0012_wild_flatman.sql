ALTER TABLE "usersPreferences" ADD COLUMN "is_state_complete" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "is_state_complete" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "usersVerification" ADD COLUMN "is_state_complete" boolean DEFAULT false;