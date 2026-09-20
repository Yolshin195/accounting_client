FROM nginx:alpine

# Шаблон: при старте контейнера envsubst подставит ${API_UPSTREAM}
# и создаст из него /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Значение по умолчанию, если переменная не задана в compose
ENV API_UPSTREAM=api:8888

# Статические файлы
COPY out/ /usr/share/nginx/html/

# Собственные страницы ошибок (вместо стандартных страниц nginx)
COPY nginx/errors/ /usr/share/nginx/html/errors/

EXPOSE 80 443
