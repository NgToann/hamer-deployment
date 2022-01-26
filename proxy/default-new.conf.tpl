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

server {
    listen 80;
    #return 301 https://$host$request_uri;
    location /static {
        alias /vol/static;
    }
    client_max_body_size    10M;
    
    location / {
        uwsgi_pass              app:9000;
        include                 /etc/nginx/uwsgi_params;        
    }
}
 
server {
 
    listen 443 ssl;
    server_name hamerusa.vn;
 
    ssl_certificate          /etc/nginx/hamerusavn.crt;
    ssl_certificate_key      /etc/nginx/hamerusavn.key;
 
    ssl_session_cache  builtin:1000  shared:SSL:10m;
    ssl_protocols  TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers 'ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHAECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:ECDHE-ECDSA-DES-CBC3-SHA:ECDHE-RSA-DES-CBC3-SHA:EDH-RSA-DES-CBC3-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:DES-CBC3-SHA:!DSS';
    ssl_prefer_server_ciphers on;
 
    #access_log            /var/log/nginx/vinahost.vn.access.log;
    
    location /static {
        alias /vol/static;
    }
    
    location / {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_buffering off;
        proxy_request_buffering off;
        proxy_http_version 1.1;
        proxy_intercept_errors on;
        proxy_pass          http://hamerusa.vn;
    }
  }
  //https://gist.github.com/davewongillies/6897161
