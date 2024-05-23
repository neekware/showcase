DO $$ BEGIN
 CREATE TYPE "public"."Role" AS ENUM('USER', 'STAFF', 'ADMIN', 'SUPERUSER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" varchar(36) NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"emailVerified" boolean DEFAULT false,
	"phone" varchar(255),
	"phoneVerified" boolean DEFAULT false,
	"avatar" text,
	"password" varchar(255),
	"role" "Role" DEFAULT 'USER',
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"lastLoginAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_id_unique" UNIQUE("id"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth" (
	"id" varchar(36) NOT NULL,
	"refreshToken" text,
	"accessToken" text,
	"expiresAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"userId" varchar(36) NOT NULL,
	CONSTRAINT "auth_id_unique" UNIQUE("id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth" ADD CONSTRAINT "auth_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
