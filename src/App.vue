<template>
  <div class="view-port" :class="{ dark: settings.darkMode }">
    <div class="header">
      <h3>{{ capitalize(route.name) }}</h3>
    </div>
    <div class="view">
      <RouterView />
    </div>
    <Nav />
  </div>
</template>

<script setup>
import { useLocalStorage } from "@vueuse/core";
import { useRoute } from "vue-router";
import { StatusBar, Style } from "@capacitor/status-bar";

const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const settings = useLocalStorage("settings", {
  darkMode: false,
});

const route = useRoute();

onMounted(() => {
  if (settings.darkMode) {
    StatusBar.setBackgroundColor({
      color: "#000000",
    });
    StatusBar.setStyle({
      style: Style.Dark,
    });
  } else {
    StatusBar.setBackgroundColor({
      color: "#ffffff",
    });
    StatusBar.setStyle({
      style: Style.Light,
    });
  }
});
</script>

<style lang="scss">
.header {
  height: 80px;
  color: hsl(var(--muted-foreground));
  font-size: 1.5rem;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  padding-left: 15px;
}

.view {
  height: calc(100% - 160px);
}
.view-port {
  display: flex;
  flex-direction: column;

  height: 100vh;

  background: hsl(var(--background));

  .dash-item {
    display: flex;
    // justify-content: center;
    align-items: center;
    flex-direction: column;

    padding: 0 20px;

    .field {
      width: 100%;

      display: flex;
      justify-content: space-between;
      align-items: center;

      label {
        color: hsl(var(--foreground));
      }
    }
  }
}
</style>
