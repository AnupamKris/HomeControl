<template>
  <div class="control">
    <div
      class="control-btn"
      v-for="control in device?.controls"
      :class="{ active: controlStates[control.name]?.active }"
      @click="toggleControl(control.name)"
    >
      <div class="inner">
        {{ control.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLocalStorage } from "@vueuse/core";
import { useRoute } from "vue-router";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import axios from "axios";

const hapticsImpactMedium = async () => {
  await Haptics.impact({ style: ImpactStyle.Medium });
};

const route = useRoute();
const settings = useLocalStorage("settings", {
  darkMode: false,
});
const devices = useLocalStorage("devices", {
  devices: [],
});

const device = computed(() => {
  return devices.value[route.params.device];
});

const controlStates = ref({});

const toggleControl = (control) => {
  controlStates.value[control].active = !controlStates.value[control].active;
  hapticsImpactMedium();

  // Send control state to device
  axios.get("http://" + device.value.serverIp + "/toggle", {
    params: {
      pin: controlStates.value[control].pin,
      value: controlStates.value[control].active ? 1 : 0,
    },
  });
};

onMounted(() => {
  console.log(device.value.controls);
  device.value.controls.forEach((control) => {
    controlStates.value[control.name] = {
      active: false,
      pin: control.triggerPin,
    };
  });
});
</script>

<style lang="scss" scoped>
.control {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-around;

  height: 100%;
  width: 100%;

  padding: 10px;

  .control-btn {
    height: 120px;
    width: 120px;

    display: flex;
    justify-content: center;
    align-items: center;

    background: hsl(var(--accent));
    color: hsl(var(--foreground));

    border-radius: 50%;

    transition: all 0.2s ease;

    .inner {
      transition: all 0.2s ease;
      width: 90px;
      height: 90px;

      display: flex;
      justify-content: center;
      align-items: center;

      background: hsl(var(--foreground)) + #2eff7e;

      box-shadow: 0 0 5px 5px #2eff7e;

      border-radius: 50%;
    }
  }

  .active {
    .inner {
      box-shadow: 0 0 5px 5px #ff5f37;
    }
  }
}
</style>
