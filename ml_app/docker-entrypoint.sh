#!/bin/bash

if [ "$DATABASE" = "mysql" ]
then
    echo "Waiting for mysql..."
    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done
    echo "MySQL started"
fi

#if uncommented, it will clear the entire database every time the script runs. It uses the python manage.py
#flush --no-input command to remove all data from the database.
#This is generally not recommended in production environments, as it can lead to data loss.

# echo "Clear entire database"
# python manage.py flush --no-input

echo "Appling database migrations..."
python manage.py makemigrations 
python manage.py migrate

#The final line exec "$@" is a way to pass any additional arguments to the command that will be executed after this script. 
#This is commonly used when running this script as an entry point for a Docker container, where additional commands or 
#arguments can be passed to the container at runtime.
exec "$@"
