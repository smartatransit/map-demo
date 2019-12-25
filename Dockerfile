FROM node:10

EXPOSE 4000

COPY . .
CMD npm start
