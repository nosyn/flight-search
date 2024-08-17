CREATE TABLE IF NOT EXISTS "airports_table" (
	"iata_code" varchar(3) PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "flights_schedule_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"flight_number" varchar(6) NOT NULL,
	"from_airport" varchar NOT NULL,
	"to_airport" varchar NOT NULL,
	"departure_time" timestamp with time zone NOT NULL,
	"arrival_time" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tickets_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"flight_id" integer NOT NULL,
	"passenger_name" text NOT NULL,
	"passenger_email" text NOT NULL,
	"seat_number" varchar(3) NOT NULL,
	"record_locator" varchar(6) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flights_schedule_table" ADD CONSTRAINT "flights_schedule_table_from_airport_airports_table_iata_code_fk" FOREIGN KEY ("from_airport") REFERENCES "public"."airports_table"("iata_code") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flights_schedule_table" ADD CONSTRAINT "flights_schedule_table_to_airport_airports_table_iata_code_fk" FOREIGN KEY ("to_airport") REFERENCES "public"."airports_table"("iata_code") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tickets_table" ADD CONSTRAINT "tickets_table_flight_id_flights_schedule_table_id_fk" FOREIGN KEY ("flight_id") REFERENCES "public"."flights_schedule_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
