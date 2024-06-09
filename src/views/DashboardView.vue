<template>
  <div class="dashboard" :class="{ dark: settings.darkMode }">
    <div class="header">
      <h3>{{ capitalize(activeTab) }}</h3>
    </div>
    <div class="dash-item" v-if="activeTab == 'settings'">
      <div class="field">
        <label for="darkMode">Dark Mode</label>
        <Switch v-model:checked="settings.darkMode" id="darkMode" />
      </div>
      <!-- <Button @click="settings.darkMode = !settings.darkMode">
        <Moon v-if="!settings.darkMode" />
        <Sun v-else />
      </Button> -->
    </div>
  </div>
</template>

<script setup>
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useLocalStorage } from "@vueuse/core";
import { Heart, MonitorSmartphone, Settings, Moon, Sun } from "lucide-vue-next";
import axios from "axios";

const serverIp = useLocalStorage("serverIp");
const settings = useLocalStorage("settings", {
  darkMode: false,
});

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const toggleRelay = async (checked) => {
  await axios.get(serverIp.value + "/toggle");
};

const clearServer = () => {
  serverIp.value = "";
};

const activeTab = ref("dashboard");

onMounted(() => {});
</script>

<style lang="scss" scoped>
.dashboard {
  display: flex;
  flex-direction: column;

  height: 100%;

  background: hsl(var(--background));

  .header {
    height: 80px;
    color: hsl(var(--muted-foreground));
    font-size: 1.5rem;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    padding-left: 15px;
  }

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
