FROM python:3.8

# Create app directory
WORKDIR /usr/src/app

COPY requirements.txt ./

 ADD settings.cfg ./
 ADD app.py ./


RUN pip install pystrich

#RUN python3 -m venv .venv
#RUN source .venv/bin/activate
RUN pip install -r requirements.txt


COPY . .

EXPOSE 5000


CMD [ "python", "./app.py" ]