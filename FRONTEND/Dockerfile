# Use the official image as a parent image
FROM node:16-alpine
WORKDIR /app
COPY . .
RUN npm install -g @angular/cli@latest
RUN npm install
RUN ng build --prod

FROM nginx:alpine
COPY --from=build /app/dist/frontend /usr/share/nginx/html
