FROM python:3.10

WORKDIR /app

COPY requirements.txt .
RUN apt-get update && apt-get install -y netcat-openbsd
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install django-cors-headers===4.3.1

COPY . .

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
