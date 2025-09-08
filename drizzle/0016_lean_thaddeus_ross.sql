ALTER TABLE "usersVerification" ALTER COLUMN "id_type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "usersVerification" ALTER COLUMN "id_front" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "usersVerification" ALTER COLUMN "id_back" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "usersVerification" ALTER COLUMN "proof_of_address_type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "usersVerification" ALTER COLUMN "is_phone_number_verified" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "usersVerification" ALTER COLUMN "is_stage_complete" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "usersPreferences" ADD CONSTRAINT "usersPreferences_user_id_unique" UNIQUE("user_id");--> statement-breakpoint
ALTER TABLE "usersVerification" ADD CONSTRAINT "usersVerification_user_id_unique" UNIQUE("user_id");