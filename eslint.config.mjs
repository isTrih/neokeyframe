// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt().override("nuxt/typescript", {
// Your custom configs here
  files: ["layouts/*.vue"],
  rules: {
    // ...Override rules, for example:
    "@typescript-eslint/ban-types": "off",
  },
});
