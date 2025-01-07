export default defineNuxtRouteMiddleware((to) => {
  if (to.path === "/about" || to.path === "/about/") {
    setPageLayout("doc");
  }
});
