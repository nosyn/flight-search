ALTER TABLE "flights_schedule_table" DROP CONSTRAINT "flights_schedule_table_from_airport_unique";--> statement-breakpoint
ALTER TABLE "flights_schedule_table" DROP CONSTRAINT "flights_schedule_table_to_airport_unique";--> statement-breakpoint
ALTER TABLE "flights_schedule_table" DROP CONSTRAINT "flights_schedule_table_from_airport_airports_table_iata_code_fk";
--> statement-breakpoint
ALTER TABLE "flights_schedule_table" DROP CONSTRAINT "flights_schedule_table_to_airport_airports_table_iata_code_fk";
--> statement-breakpoint
ALTER TABLE "flights_schedule_table" ADD COLUMN "departure_airport" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "flights_schedule_table" ADD COLUMN "arrival_airport" varchar NOT NULL;--> statement-breakpoint
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
ALTER TABLE "flights_schedule_table" DROP COLUMN IF EXISTS "from_airport";--> statement-breakpoint
ALTER TABLE "flights_schedule_table" DROP COLUMN IF EXISTS "to_airport";--> statement-breakpoint
ALTER TABLE "flights_schedule_table" ADD CONSTRAINT "flights_schedule_table_departure_airport_unique" UNIQUE("departure_airport");--> statement-breakpoint
ALTER TABLE "flights_schedule_table" ADD CONSTRAINT "flights_schedule_table_arrival_airport_unique" UNIQUE("arrival_airport");