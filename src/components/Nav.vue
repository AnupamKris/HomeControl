<template>
  <div class="navbar" :class="{ dark: settings.darkMode }">
    <RouterLink to="/favorites" class="item">
      <div class="icon">
        <Heart />
      </div>
      <p>Favorites</p>
    </RouterLink>
    <RouterLink to="/devices" class="item">
      <div class="icon">
        <MonitorSmartphone />
      </div>
      <p>Devices</p>
    </RouterLink>
    <RouterLink to="/settings" class="item">
      <div class="icon">
        <Settings />
      </div>
      <p>Settings</p>
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { Heart, MonitorSmartphone, Settings } from "lucide-vue-next";
import { useLocalStorage } from "@vueuse/core";

const settings = useLocalStorage("settings", {
  darkMode: false,
});
</script>

<style lang="scss" scoped>
.navbar {
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;

  border-top: hsl(var(--border)) 1px solid;

  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 33%;
    color: hsl(var(--muted-foreground));

    p {
      font-size: 0.7rem;
      margin-top: 5px;
    }

    .icon {
      padding: 5px 15px;
      border-radius: 25px;
      svg {
        stroke: hsl(var(--muted-foreground));
      }
    }
  }

  .router-link-active {
    color: hsl(var(--foreground));
    .icon {
      background: hsl(var(--accent));
      svg {
        stroke: hsl(var(--foreground));
      }
    }
  }
}
</style>
