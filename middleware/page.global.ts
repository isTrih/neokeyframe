export default defineNuxtRouteMiddleware((to) => {
  // console.log(device.desktop());
  if (to.path === "/about" || to.path === "/about/") {
    console.log("关于");
    setPageLayout("doc");
  }
});
