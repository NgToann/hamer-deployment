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
    listen 80; 
    server_name hamerusa.vn;
    access_log off;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name hamerusa.vn;

    ssl_certificate /etc/ssl/hamerusavn.pem;
    ssl_certificate_key /etc/ssl/hamerusavn.key;
    
    ssl_protocols SSLv3 TLSv1;
    ssl_ciphers HIGH:!aNULL:!MD5;

    sendfile on;

    charset utf-8;
    # max upload size
    client_max_body_size 40M; # adjust to taste

    location /static {
        alias /vol/static;
    }

    location / {
        uwsgi_pass              ${APP_HOST}:${APP_PORT};
        include                 /etc/nginx/uwsgi_params;
    }

    location / {
        #proxy_pass http://0.0.0.0:8445/;
        proxy_pass http://0.0.0.0:8445/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}