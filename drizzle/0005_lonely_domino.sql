ALTER TABLE "users" RENAME COLUMN "age" TO "date_of_birth";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "gender" varchar(20);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "phone" varchar(50);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "address" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "city" varchar(50);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "state" varchar(50);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "country" varchar(50);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "postal_code" varchar(20);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "occupation" varchar(100);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "company" varchar(100);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "income" integer;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "id_document_url" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "utility_bill_url" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "other_docs" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "current_stage" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "completed_stages" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;