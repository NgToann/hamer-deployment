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
#            client_max_body_size    10M;
#        }
#}

server {
    listen 8000;

    location /static {
        alias /vol/static;
    }

    location / {
        uwsgi_pass              app:9000;
        include                 /etc/nginx/uwsgi_params;
        client_max_body_size    10M;
    }
}

server {
    listen 443 ssl;
    server_name hamerusa.vn;

    ssl_certificate     /etc/nginx/hamerusavn.crt;
    ssl_certificate_key /etc/nginx/hamerusavn.key;

    ssl_protocols  TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers HIGH:!aNULL:!eNULL:!EXPORT:!CAMELLIA:!DES:!MD5:!PSK:!RC4;

    sendfile on;

    charset utf-8;
    
    location /static {
        alias /vol/static;
    }
    
    location / {
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP               $remote_addr;
        proxy_set_header X-Forwarded-For         $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        proxy_pass http://45.119.85.161;
        uwsgi_pass              app:9000;
        include                 /etc/nginx/uwsgi_params;
        client_max_body_size    10M;
    }
}
