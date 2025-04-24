import { defineNuxtPlugin } from "#app";
import useLoginStore from "~/store/login/login";

export default defineNuxtPlugin(() => {
  const loginStore = useLoginStore();
  loginStore.loadLocalCacheAction();
});
