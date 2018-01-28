FROM node:carbon
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
ENV BACKEND_HOST="122.129.79.67:5000"
COPY . .
EXPOSE 8080
CMD ["npm", "start"]
