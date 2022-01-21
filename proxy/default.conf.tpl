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

server {
    listen 80;
    listen [::]:80;
    server_name hamerusa.vn;
    return         301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name hamerusa.vn;
    ssl_certificate /root/ssl/official/hamerusavn.cert;
    ssl_certificate_key /root/ssl/official/hamerusavn.private_key;

    sendfile on;

    charset utf-8;
    # max upload size
    client_max_body_size 20M; # adjust to taste

    location /static {
            alias /vol/static;
    }

    location / {
        proxy_pass http://0.0.0.0:8000/;
        
        uwsgi_pass              ${APP_HOST}:${APP_PORT};
        include                 /etc/nginx/uwsgi_params;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}