export default defineNuxtRouteMiddleware((to) => {
  // console.log(device.desktop());
  if (to.path === "/about" || to.path === "/about/") {
    setPageLayout("doc");
  }
});
