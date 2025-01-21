FROM node:22
LABEL authors="trih"
# 任意ip
ENV HOST 0.0.0.0
# 暴露项目端口
EXPOSE 3000
# 安装 pnpm
RUN npm install -g pnpm

# 容器内创建目录mynuxt
RUN mkdir -p /usr/neokeyframe

# 将当前目录文件复制到 /usr/frontend/mynuxt 目录
COPY /.output /usr/neokeyframe
COPY /nuxt.config.ts /usr/neokeyframe
COPY /package.json /usr/neokeyframe
COPY /static /user/neokeyframe

# 切换工作目录到 /usr/frontend/mynuxt 目录
WORKDIR /usr/neokeyframe
# 使用 pnpm 安装运行时依赖（仅生产环境依赖）
RUN pnpm install --prod