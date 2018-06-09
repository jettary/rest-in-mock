FROM node:jessie

WORKDIR /app

COPY ./backend/package.json ./backend/npm-shrinkwrap.json /app/
RUN npm install pm2 -g
RUN npm install -y

COPY ./backend /app
RUN ./node_modules/.bin/tsc --outDir /backend/compiled

EXPOSE 3000
CMD ["npm", "start"]
