#!/bin/bash

# Get the current working directory
script_path=$(dirname "$(readlink -f "$0")")
root_dir=$script_path/..

# Start Docker Compose
echo "Starting Docker Compose..."

if command -v docker compose &> /dev/null; then
    docker compose -f $root_dir/docker/docker-compose.dev.yaml up -d
elif command -v docker-compose &> /dev/null; then
    docker-compose -f $root_dir/docker/docker-compose.dev.yaml up -d
else
    echo "Error: Neither 'docker compose' nor 'docker-compose' command found."
    exit 1
fi

# Check if Docker Compose started successfully
if [ $? -eq 0 ]; then
    echo "Docker Compose started successfully!"
else
    echo "Failed to start Docker Compose."
fi