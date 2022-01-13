FROM node:16.13.2
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
EXPOSE 5000
CMD ["npm", "run", "dev"]