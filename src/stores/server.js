import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useServerStore = defineStore("server", () => {
  const serverIp = ref("");
  function setServerIp(url) {
    serverIp.value = url;
  }

  const server = computed(() => "http://" + serverIp.value);

  return { server, setServerIp, serverIp };
});
