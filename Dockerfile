FROM node:12
WORKDIR /var/lib/testProject
COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]
