FROM tiangolo/uvicorn-gunicorn:python3.10


# Turns off buffering for easier container logging
#ENV PYTHONUNBUFFERED=1

# Install pip requirements
COPY requirements.txt .
COPY packages.txt .

RUN apt-get update
RUN xargs -a packages.txt apt-get install --yes
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt 


COPY ./app /app

EXPOSE 8000

CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "80", "--reload"]
