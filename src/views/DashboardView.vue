<template>
  <div class="dashboard flex justify-center items-center h-full">
    <div class="field">
      <Label for="relay">Toggle Relay</Label>
      <Switch @update:checked="toggleRelay" id="relay" />
    </div>
    <Button @click="clearServer">Clear Server</Button>
  </div>
</template>

<script setup>
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useLocalStorage } from "@vueuse/core";
import axios from "axios";

const serverIp = useLocalStorage("serverIp");

const toggleRelay = async (checked) => {
  await axios.get(serverStore.server + "/toggle");
};

const clearServer = () => {
  serverIp.value = "";
};
</script>

<style lang="scss" scoped>
.dashboard {
  display: flex;
  flex-direction: column;
}
.field {
  width: 80%;
  max-width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
