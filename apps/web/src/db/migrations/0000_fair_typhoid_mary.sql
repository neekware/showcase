DO $$ BEGIN
 CREATE TYPE "public"."Role" AS ENUM('USER', 'STAFF', 'ADMIN', 'SUPERUSER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"emailVerified" boolean DEFAULT false,
	"phone" varchar(255),
	"phoneVerified" boolean DEFAULT false,
	"avatar" text,
	"password" text DEFAULT gen_random_uuid(),
	"role" "Role" DEFAULT 'USER',
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"last_login_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth" (
	"id" text PRIMARY KEY NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth" ADD CONSTRAINT "auth_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
