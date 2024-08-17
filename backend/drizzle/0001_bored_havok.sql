ALTER TABLE "flights_schedule_table" ADD COLUMN "price" numeric(2, 2) NOT NULL;--> statement-breakpoint
ALTER TABLE "flights_schedule_table" ADD CONSTRAINT "flights_schedule_table_from_airport_unique" UNIQUE("from_airport");--> statement-breakpoint
ALTER TABLE "flights_schedule_table" ADD CONSTRAINT "flights_schedule_table_to_airport_unique" UNIQUE("to_airport");