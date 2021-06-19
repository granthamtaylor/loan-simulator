FROM python:3.8

RUN cat /etc/os-release
RUN apt-get update

WORKDIR /usr/src/app/

# install required python packages
ADD requirements.txt .
RUN pip install --upgrade pip
RUN python -m pip install -r requirements.txt

