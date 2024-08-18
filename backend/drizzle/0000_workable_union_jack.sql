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
	"business_price" integer NOT NULL,
	CONSTRAINT "flights_schedule_table_flight_number_unique" UNIQUE("flight_number")
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
 ALTER TABLE "tickets_table" ADD CONSTRAINT "tickets_table_flight_id_flights_schedule_table_id_fk" FOREIGN KEY ("flight_id") REFERENCES "public"."flights_schedule_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
