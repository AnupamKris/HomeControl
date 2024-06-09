<template>
  <div class="settings">
    <div class="field">
      <label for="darkMode">Dark Mode</label>
      <Switch v-model:checked="settings.darkMode" id="darkMode" />
    </div>
  </div>
</template>

<script setup>
import { useLocalStorage } from "@vueuse/core";
import { Switch } from "@/components/ui/switch";
import { StatusBar, Style } from "@capacitor/status-bar";

const settings = useLocalStorage("settings", {
  darkMode: false,
});

watch(settings.value, async () => {
  if (settings.darkMode) {
    await StatusBar.setBackgroundColor({
      color: "#000000",
    });
    await StatusBar.setStyle({
      style: Style.Dark,
    });
  } else {
    await StatusBar.setBackgroundColor({
      color: "#ffffff",
    });
    await StatusBar.setStyle({
      style: Style.Light,
    });
  }
});
</script>

<style lang="scss" scoped></style>
