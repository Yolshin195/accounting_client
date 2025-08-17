FROM nginx:alpine

# Копируем конфиг nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем статические файлы
COPY out/ /usr/share/nginx/html/

# Экспонируем порт
EXPOSE 80

# Запуск nginx в форграунд режиме
CMD ["nginx", "-g", "daemon off;"]
