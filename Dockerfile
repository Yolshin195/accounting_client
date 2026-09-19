FROM nginx:alpine

# Шаблон: при старте контейнера envsubst подставит ${API_UPSTREAM}
# и создаст из него /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Значение по умолчанию, если переменная не задана в compose
ENV API_UPSTREAM=api:8888

# Статические файлы
COPY out/ /usr/share/nginx/html/

EXPOSE 80 443
