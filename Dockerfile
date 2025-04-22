# Etapa 1: build do Angular
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Etapa 2: imagem NGINX com o build
FROM nginx:alpine

# Copia arquivos do build Angular
COPY --from=build /app/dist/geo-solucoes /usr/share/nginx/html

# Copia o nginx.conf customizado
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
