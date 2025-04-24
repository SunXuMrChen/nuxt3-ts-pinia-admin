// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["normalize.css"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@use '@/assets/css/variables.scss' as *;",
        },
      },
    },
  },
  modules: ["@pinia/nuxt", "@element-plus/nuxt", "@vueuse/nuxt"],
  runtimeConfig: {
    public: {
      useMock: process.env.NODE_ENV === "development",
    },
  },
});
