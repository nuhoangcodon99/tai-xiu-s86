FROM ubuntu:18.04
USER root
# setup datetime container
RUN apt-get update && apt-get install -y tzdata
ENV TZ Asia/Ho_Chi_Minh
RUN date

RUN apt-get update && apt-get install curl -y
# install nodejs
RUN curl --silent --location https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y \
  nodejs

WORKDIR /app
COPY package*.json /app/
COPY . .
RUN npm install
RUN chmod +x ./start.sh
CMD ./start.sh