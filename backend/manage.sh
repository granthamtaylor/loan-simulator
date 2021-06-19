#!/bin/bash

python manage.py makemigrations
python manage.py migrate
python manage.py syncdata applicants.json
python manage.py sync_pgviews --force
python manage.py runserver 0.0.0.0:8000
