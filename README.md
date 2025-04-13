[![CC BY-NC-SA 4.0][cc-by-nc-sa-shield]][cc-by-nc-sa]

本作品采用
[知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议][cc-by-nc-sa]进行许可。

[cc-by-nc-sa]: http://creativecommons.org/licenses/by-nc-sa/4.0/
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg
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

## NeoKeyframe 后端 Docker 部署指南

1. 拉取最新镜像:
```bash
docker pull swr.cn-east-3.myhuaweicloud.com/keyframe/keyframe-back:latest
```

2. 运行容器:
```bash
docker run -d \
  --name keyframe-back \
  -v /chaozj/data/etc:/etc:rw \
  -p 6470:6470 \
  -p 8888:8888 \
  swr.cn-east-3.myhuaweicloud.com/keyframe/keyframe-back:latest
```

### 端口说明
- 8888: 后端服务端口
- 6470: Prometheus监控指标服务端口

### 目录挂载说明
- 将主机目录/chaozj/data/etc挂载到容器内的/etc目录，权限为读写(rw)
- 该目录用于存储配置文件keyframeGo.yaml和IP数据库cz88_public_v4.czdb和cz88_public_v6.czdb

### 配置文件
- 容器启动时会自动加载/etc/keyframeGo.yaml配置文件
- 请确保配置文件中的敏感信息已正确配置

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

  keyframe-back:
    image: swr.cn-east-3.myhuaweicloud.com/keyframe/keyframe-back:latest
    container_name: keyframe-back
    restart: unless-stopped
    volumes:
      - /chaozj/data/etc:/etc:rw
    ports:
      - 8888:8888
      - 6470:6470
```