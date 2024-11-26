FROM node:16

WORKDIR /app

COPY . .

RUN npm i --force

ARG REACT_APP_BASE_URL
ENV REACT_APP_BASE_URL=http://localhost:8080
ARG REACT_APP_GOOGLE_API_KEY
ENV REACT_APP_GOOGLE_API_KEY=${REACT_APP_GOOGLE_API_KEY}

RUN npm run build

RUN mkdir -p /var/www/html
RUN mv build/* /var/www/html

WORKDIR /
RUN rm -rf /app