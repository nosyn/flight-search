DO $$ BEGIN
 CREATE TYPE "public"."flight_types" AS ENUM('economy', 'business');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."genders" AS ENUM('m', 'f', 'x', 'u');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "tickets_table" DROP CONSTRAINT "tickets_table_flight_id_flights_schedule_table_id_fk";
--> statement-breakpoint
ALTER TABLE "tickets_table" ADD COLUMN "departure_flight_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "tickets_table" ADD COLUMN "departure_flight_type" "flight_types" NOT NULL;--> statement-breakpoint
ALTER TABLE "tickets_table" ADD COLUMN "departure_flight_seat_number" varchar(3) NOT NULL;--> statement-breakpoint
ALTER TABLE "tickets_table" ADD COLUMN "departure_flight_record_locator" varchar(6) NOT NULL;--> statement-breakpoint
ALTER TABLE "tickets_table" ADD COLUMN "return_flight_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "tickets_table" ADD COLUMN "return_flight_type" "flight_types" NOT NULL;--> statement-breakpoint
ALTER TABLE "tickets_table" ADD COLUMN "return_flight_seat_number" varchar(3) NOT NULL;--> statement-breakpoint
ALTER TABLE "tickets_table" ADD COLUMN "return_flight_record_locator" varchar(6) NOT NULL;--> statement-breakpoint
ALTER TABLE "tickets_table" ADD COLUMN "passenger_dob" timestamp with time zone NOT NULL;--> statement-breakpoint
ALTER TABLE "tickets_table" ADD COLUMN "passenger_gender" "genders";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tickets_table" ADD CONSTRAINT "tickets_table_departure_flight_id_flights_schedule_table_id_fk" FOREIGN KEY ("departure_flight_id") REFERENCES "public"."flights_schedule_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tickets_table" ADD CONSTRAINT "tickets_table_return_flight_id_flights_schedule_table_id_fk" FOREIGN KEY ("return_flight_id") REFERENCES "public"."flights_schedule_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "tickets_table" DROP COLUMN IF EXISTS "flight_id";--> statement-breakpoint
ALTER TABLE "tickets_table" DROP COLUMN IF EXISTS "passenger_email";--> statement-breakpoint
ALTER TABLE "tickets_table" DROP COLUMN IF EXISTS "seat_number";--> statement-breakpoint
ALTER TABLE "tickets_table" DROP COLUMN IF EXISTS "record_locator";