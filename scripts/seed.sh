#!/bin/bash

# Get the current working directory
script_path=$(dirname "$(readlink -f "$0")")
root_dir=$script_path/..

# Run npm install in backend folder
echo "Applying migration and seeding database"

cd "$root_dir/backend"
npm run db:migarate
npm run db:seed

# Execute npm commands inside the Docker container
# docker exec flight-search-backend npm run db:migrate
# docker exec flight-search-backend npm run db:seed

