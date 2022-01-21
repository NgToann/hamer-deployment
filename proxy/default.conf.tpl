#server {
#    listen ${LISTEN_PORT};
#
#    location /static {
#        alias /vol/static;
#    }
#
#    location / {
#        uwsgi_pass              ${APP_HOST}:${APP_PORT};
#        include                 /etc/nginx/uwsgi_params;
#        client_max_body_size    10M;
#    }
#}

#HTTPS SERVER
server {
    listen       443 ssl;
    server_name  hamerusa.vn;
    ssl_certificate      hamerusa_vn_cert.pem;
    ssl_certificate_key  hamerusa_vn_cert.key;
    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;
    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;

    location /static {
        alias /vol/static;
    }

    location / {
        root   html;
        index  index.html index.htm;
        uwsgi_pass              ${APP_HOST}:${APP_PORT};
        include                 /etc/nginx/uwsgi_params;
        client_max_body_size    10M;
    }
}