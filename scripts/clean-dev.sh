#!/bin/bash

# Get the current working directory
script_path=$(dirname "$(readlink -f "$0")")
root_dir=$script_path/..

# Start Docker Compose
echo "Cleaning Docker Compose..."

if command -v docker compose &> /dev/null; then
    docker compose -f $root_dir/docker/docker-compose.dev.yaml down --remove-orphans --volumes
elif command -v docker-compose &> /dev/null; then
    docker-compose -f $root_dir/docker/docker-compose.dev.yaml down --remove-orphans --volumes
else
    echo "Error: Neither 'docker compose' nor 'docker-compose' command found."
    exit 1
fi

# Check if Docker Compose stopped successfully
if [ $? -eq 0 ]; then
    echo "Docker Compose stopped successfully!"
else
    echo "Failed to start Docker Compose."
fi