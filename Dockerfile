FROM node:18-alpine

WORKDIR /app

# Copiază package files
COPY package*.json ./

# Instalează dependențele
RUN npm install

# Copiază tot codul
COPY . .

# Expune portul
EXPOSE 3000

# Construiește aplicația
RUN npm run build

# Rulează în production mode
CMD ["npm", "run", "start"]