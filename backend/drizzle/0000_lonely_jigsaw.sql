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
CREATE TABLE IF NOT EXISTS "airports_table" (
	"iata_code" varchar(3) PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "flights_schedule_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"airplane_name" text NOT NULL,
	"airplane_iata_type_code" varchar(3) NOT NULL,
	"airline_code" varchar(2) NOT NULL,
	"flight_number" varchar(4) NOT NULL,
	"departure_airport" varchar NOT NULL,
	"arrival_airport" varchar NOT NULL,
	"departure_time" timestamp with time zone NOT NULL,
	"arrival_time" timestamp with time zone NOT NULL,
	"economy_price" integer NOT NULL,
	"business_price" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payment_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"payment_intent_id" text NOT NULL,
	"payment_status" boolean DEFAULT false NOT NULL,
	"amount" integer NOT NULL,
	"ticket_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tickets_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"clerk_id" text NOT NULL,
	"departure_flight_id" integer NOT NULL,
	"departure_flight_type" "flight_types" NOT NULL,
	"departure_flight_price" integer NOT NULL,
	"departure_flight_seat_number" varchar(3) NOT NULL,
	"departure_flight_record_locator" varchar(6) NOT NULL,
	"return_flight_id" integer NOT NULL,
	"return_flight_type" "flight_types" NOT NULL,
	"return_flight_price" integer NOT NULL,
	"return_flight_seat_number" varchar(3) NOT NULL,
	"return_flight_record_locator" varchar(6) NOT NULL,
	"passenger_name" text NOT NULL,
	"passenger_dob" timestamp with time zone NOT NULL,
	"passenger_gender" "genders"
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_table" (
	"clerk_id" text PRIMARY KEY NOT NULL,
	"stripe_id" text,
	CONSTRAINT "users_table_stripe_id_unique" UNIQUE("stripe_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flights_schedule_table" ADD CONSTRAINT "flights_schedule_table_departure_airport_airports_table_iata_code_fk" FOREIGN KEY ("departure_airport") REFERENCES "public"."airports_table"("iata_code") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flights_schedule_table" ADD CONSTRAINT "flights_schedule_table_arrival_airport_airports_table_iata_code_fk" FOREIGN KEY ("arrival_airport") REFERENCES "public"."airports_table"("iata_code") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payment_table" ADD CONSTRAINT "payment_table_ticket_id_tickets_table_id_fk" FOREIGN KEY ("ticket_id") REFERENCES "public"."tickets_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tickets_table" ADD CONSTRAINT "tickets_table_clerk_id_users_table_clerk_id_fk" FOREIGN KEY ("clerk_id") REFERENCES "public"."users_table"("clerk_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
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
