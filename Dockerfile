FROM python:3.12

ENV PYTHONUNBUFFERED 1


# Install env dependencies in one single command/layer
RUN apt-get update && apt-get install -y \
    vim \
    libffi-dev \
    libssl-dev \
    sqlite3 \
    libjpeg-dev \
    libopenjp2-7-dev \
    locales \
    cron \
    postgresql-client-15 \
    gettext

WORKDIR /app

COPY requirements.txt /app/

RUN pip install --upgrade pip && \
    pip install -r requirements.txt && \
    pip install pip-tools


EXPOSE 8080

COPY . /app
