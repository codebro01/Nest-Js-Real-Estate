CREATE TABLE "usersPreferences" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"property_type" "propertyType"[] NOT NULL,
	"min_budget" integer NOT NULL,
	"preferred_location" varchar NOT NULL,
	"number_of_bedrooms" varchar(50)[],
	"new_property_alert" boolean DEFAULT false,
	"price_change_notifications" boolean DEFAULT false,
	"market_updates_and_news" boolean DEFAULT true,
	"investment_opportunities" boolean DEFAULT false,
	"preferred_language" "preferredLanguage" DEFAULT 'english' NOT NULL,
	"contact_frequency" "contactFrequencyType" DEFAULT 'weekly' NOT NULL,
	"profile_visibility" "profileVisibilityType" DEFAULT 'public' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "usersVerification" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"id_type" "IDTypes",
	"id_front" varchar(50),
	"id_back" varchar(50),
	"proof_of_address_type" "proofOfAddressType",
	"is_phone_number_verified" boolean DEFAULT false,
	"address" text,
	"city" varchar(50),
	"country" varchar(50),
	"postal_code" varchar(20),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "emailVerified" TO "is_email_Verified";--> statement-breakpoint
ALTER TABLE "usersPreferences" ADD CONSTRAINT "usersPreferences_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "usersVerification" ADD CONSTRAINT "usersVerification_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "address";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "city";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "state";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "country";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "postal_code";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "occupation";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "company";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "income";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "id_document_url";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "utility_bill_url";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "other_docs";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "current_stage";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "completed_stages";