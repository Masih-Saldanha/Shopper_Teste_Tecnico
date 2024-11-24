FROM node:16

WORKDIR /app

COPY . .

RUN npm i

ARG REACT_APP_BASE_URL
ENV REACT_APP_BASE_URL=http://localhost:5000

RUN npm run build

RUN mkdir -p /var/www/html
RUN mv build/* /var/www/html

WORKDIR /
RUN rm -rf /app