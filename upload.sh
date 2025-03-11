#l/uSr/D1n/env bash
version=$1
doBuild=$2
if [ -z "$version" ]; then
    echo "请输入版本号"
    exit 1
fi

if [ -z "$doBuild" ]; then
    echo "请输入是否构建"
    exit 1
fi

if [ "$doBuild" != "false" ]; then
echo "开始build，版本号：${version}" >> build.log
nuxt build
fi


echo "开始构建镜像，版本号：${version}" >> build.log
docker build --platform linux/amd64 -t neo-keyframe:v"${version}" .

# 写日志
echo "$(date '+%Y-%m-%d %H:%M:%S') - 构建镜像版本：${version}" >> build.log

echo "开始打标签，版本号：${version}" >> build.log
docker tag neo-keyframe:v"${version}" swr.cn-east-3.myhuaweicloud.com/keyframe/neo-keyframe:v"${version}" # 为镜像打标签
echo "开始推送镜像，版本号：${version}" >> build.log
docker push swr.cn-east-3.myhuaweicloud.com/keyframe/neo-keyframe:v"${version}"     # 上传镜像到华为云镜像仓库

echo "开始打标签，版本号：latest" >> build.log
docker tag neo-keyframe:v"${version}" swr.cn-east-3.myhuaweicloud.com/keyframe/neo-keyframe:latest # 为镜像打标签
echo "开始推送镜像，版本号：latest" >> build.log
docker push swr.cn-east-3.myhuaweicloud.com/keyframe/neo-keyframe:latest     # 上传镜像到华为云镜像仓库

echo "$(date '+%Y-%m-%d %H:%M:%S') - 完成更新镜像版本：${version}" >> build.log
