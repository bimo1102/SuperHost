FROM nginx:alpine

# Xóa trang html mặc định của Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copy cấu hình Nginx siêu chuẩn của bạn vào
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy thư mục dist (đã được PowerShell build ở ngoài) ném vào Nginx
COPY dist /usr/share/nginx/html

EXPOSE 2518
CMD ["nginx", "-g", "daemon off;"]
