# Etapa 1: Build Angular
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --configuration production

# Etapa 2: Servidor Nginx
FROM nginx:alpine
COPY --from=build /app/dist/tu-nombre-app /usr/share/nginx/html

# Copia configuración personalizada de Nginx (opcional)
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
