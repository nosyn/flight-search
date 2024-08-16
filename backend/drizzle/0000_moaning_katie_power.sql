CREATE TABLE IF NOT EXISTS "airports_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"iata_code" varchar(3) NOT NULL
);
