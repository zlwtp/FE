FROM registry.2haohr.com/2haohr-fe/node8-alpine:latest

ARG DM_PROJECT_ENV=dev

ENV NODE_CHROME_PATH /node/data/
ENV APP_PATH /node/app/
ENV DM_PROJECT_ENV $DM_PROJECT_ENV
ENV NODE_ENV 'production'
EXPOSE 2333

ADD . $APP_PATH

WORKDIR  $APP_PATH
CMD node ./src/app.js