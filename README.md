# 开发手册


### 获取环境变量
```typescript
const runtimeConfig = useRuntimeConfig();
console.log(runtimeConfig.public.baseUrl);
```

```typescript
onMounted()
{
}
// 生命周期是在客户端渲染、无法收录
// SEO不友好
```