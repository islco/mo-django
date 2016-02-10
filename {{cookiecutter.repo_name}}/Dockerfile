FROM python:3.5
ENV PYTHONUNBUFFERED 1
RUN curl -sL https://deb.nodesource.com/setup_5.x | bash -
RUN apt-get install -y nodejs
EXPOSE 8000 9000
RUN mkdir /project
WORKDIR /project
ADD . /project/
RUN pip install -r requirements.txt
RUN npm install
