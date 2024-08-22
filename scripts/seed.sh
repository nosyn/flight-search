#!/bin/bash

# Run npm install in backend folder
echo "Applying migration and seeding database"

# Execute npm commands inside the Docker container
docker exec flight-search-backend npm run db:migrate
docker exec flight-search-backend npm run db:seed
