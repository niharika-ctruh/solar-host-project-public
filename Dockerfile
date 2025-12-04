FROM node:alpine
WORKDIR /app
COPY package.json ./
#COPY package-lock.json ./
COPY ./ ./
RUN apk add --upgrade xdg-utils
RUN npm -f i
RUN npm -f install react-router-dom --save
RUN npm i baseline-browser-mapping@latest -D
RUN npm run build
Expose 3000
CMD ["npm", "start"]
