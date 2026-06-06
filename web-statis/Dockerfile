# Kita gunakan web server nginx sebagai base image 
FROM nginx:alpine

#Kita copy file html dan gambar ke dalam folder html di nginx
COPY portfolio.html /usr/share/nginx/html/index.html
COPY Doni.jpg /usr/share/nginx/html/Doni.jpg

#kita expose port 80 untuk mengakses web server nginx
EXPOSE 80
