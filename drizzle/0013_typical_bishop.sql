ALTER TABLE "usersPreferences" RENAME COLUMN "is_state_complete" TO "is_stage_complete";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "is_state_complete" TO "is_stage_complete";--> statement-breakpoint
ALTER TABLE "usersVerification" RENAME COLUMN "is_state_complete" TO "is_stage_complete";