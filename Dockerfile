FROM python:3.6

# EXPOSE 5000

WORKDIR /backend

COPY requirements.txt /backend
RUN python -m pip install --upgrade pip
RUN pip install --trusted-host pypi.org --trusted-host pypi.python.org --trusted-host=files.pythonhosted.org --no-cache-dir -r requirements.txt

COPY config.py /backend
COPY migration.py /backend
COPY mysql_connector.py /backend
COPY __pycache__ /backend
COPY app.py /backend

# CMD python server.py
RUN export FLASK_APP=flaskr

CMD ["flask", "run", "--host", "0.0.0.0"]