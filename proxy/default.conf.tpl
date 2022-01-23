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
    #listen 80;
    #listen [::]:80;
    #server_name hamerusa.vn;
    #return         301 https://$server_name$request_uri;
    listen 80; 
    server_name hamerusa.vn;
    access_log off;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name hamerusa.vn;
    ssl_certificate /etc/nginx/hamerusavn.crt;
    ssl_certificate_key /etc/nginx/hamerusavn.key;
    #ssl_certificate_key /etc/nginx/hamerusavn.pem;

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
        #include                 /etc/nginx/hamerusavn.crt;
        #include                 /etc/nginx/hamerusavn.private_key;

        #client_max_body_size    10M;
    }  

    location / {
        #proxy_pass http://0.0.0.0:8445/;
        #proxy_http_version 1.1;
        #proxy_set_header Upgrade $http_upgrade;
        #proxy_set_header Connection "upgrade";
        #proxy_set_header Host $host;

        proxy_pass http://127.0.0.1:8001; 
        proxy_set_header X-Forwarded-Host $server_name;
        proxy_set_header X-Real-IP $remote_addr;
        add_header P3P 'CP="ALL DSP COR PSAa PSDa OUR NOR ONL UNI COM NAV"';
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        add_header Front-End-Https on;
        proxy_redirect off;  
    }
}