FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT [ "nginx","-g", "daemon off;" ]
