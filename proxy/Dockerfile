FROM nginxinc/nginx-unprivileged:1-alpine
LABEL maintainer="ngtoann"

COPY ./default.conf.tpl /etc/nginx/default.conf.tpl
COPY ./uwsgi_params /etc/nginx/uwsgi_params
COPY ./run.sh /run.sh

ENV LISTEN_PORT=8000
ENV APP_HOST=app
ENV APP_PORT=9000

USER root

RUN mkdir -p /vol/static && \
    mkdir -p /ss/official && \
    chmod 755 /vol/static && \
    touch /etc/nginx/conf.d/default.conf && \
    chown nginx:nginx /etc/nginx/conf.d/default.conf && \
    chmod +x /run.sh

COPY ./hamerusavn.private_key /etc/nginx/ssl/official/hamerusavn.private_key
COPY ./hamerusavn.cert /etc/nginx/ssl/official/hamerusavn.cert

VOLUME /vol/static

USER nginx

CMD ["/run.sh"]