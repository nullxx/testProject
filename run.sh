#!/bin/bash

# Check if docker installed
if [ ! `builtin type -p docker` ];
then
    echo "Docker not found. Please install before proceed.";
    exit 1;
fi

# docker build
docker build -t nullx/testproject
# docker run
docker run nullx/testproject
