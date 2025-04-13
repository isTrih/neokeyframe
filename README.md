## NeoKeyframe 前端 Docker 部署指南

1. 拉取最新镜像:
```bash
docker pull swr.cn-east-3.myhuaweicloud.com/keyframe/neo-keyframe:latest
```

2. 运行容器:
```bash
docker run -d \
  --name neo-keyframe \
  -p 3000:${NUXT_PORT} \
  -e NUXT_PORT=${NUXT_PORT} \
  -e NUXT_HOST=${NUXT_HOST} \
  -e NUXT_PUBLIC_BASE_URL=${NUXT_PUBLIC_BASE_URL} \
  -e NUXT_PUBLIC_IMG_URL=${NUXT_PUBLIC_IMG_URL} \
  swr.cn-east-3.myhuaweicloud.com/keyframe/neo-keyframe:latest
```

## 环境变量说明

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| NUXT_PORT | 3000 | 应用内部端口 |
| NUXT_HOST | 0.0.0.0 | 应用监听地址 |
| NUXT_PUBLIC_BASE_URL | https://api.example.com/v1 | 后端API地址 |
| NUXT_PUBLIC_IMG_URL | https://cdn.example.com | 图片CDN地址 |

## 反向代理配置示例(Nginx)

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## 使用docker-compose部署

```yaml
version: '3.3'
services:
  neo-keyframe:
    image: swr.cn-east-3.myhuaweicloud.com/keyframe/neo-keyframe:latest
    container_name: neo-keyframe
    restart: unless-stopped
    ports:
      - 3000:${NUXT_PORT}
    environment:
      - NUXT_PORT=${NUXT_PORT}
      - NUXT_HOST=${NUXT_HOST}
      - NUXT_PUBLIC_BASE_URL=${NUXT_PUBLIC_BASE_URL}
      - NUXT_PUBLIC_IMG_URL=${NUXT_PUBLIC_IMG_URL}
```