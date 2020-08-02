#!/bin/bash

# Check if docker installed
if [ ! `builtin type -p docker` ];
then
    echo "Docker not found. Please install before proceed.";
    if [ ! `builtin type -p git` ];
    then
        echo "Git not found."
        echo "Please get source code at /home/jon/testProject-master (git: https://github.com/nullxx/testProject.git)"
        echo "Project requirements: node, npm, docker"
    fi
    exit 1;
fi

# docker build
docker build -t nullx/testproject .
# docker run
docker run nullx/testproject
