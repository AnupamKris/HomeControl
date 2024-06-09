<template>
  <div class="devices">
    <div class="device-list">
      <div
        v-for="(device, index) in devices"
        :key="index"
        class="device"
        @click="goToDevice(index)"
      >
        {{ device.name }}
      </div>
    </div>
    <div class="add">
      <AddDevice @save="addDevice">
        <Button class="curved" variant="secondary">
          <Plus class="h-7 w-7" />
        </Button>
      </AddDevice>
    </div>
  </div>
</template>

<script setup>
import { Plus } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@vueuse/core";
import { useRouter } from "vue-router";

const devices = useLocalStorage("devices", []);
const router = useRouter();

const addDevice = (data) => {
  devices.value.push(data);
};

const goToDevice = (index) => {
  router.push("/device/" + index);
};
</script>

<style lang="scss" scoped>
.devices {
  display: flex;
  justify-content: center;
  // align-items: center;
  height: 100%;
  position: relative;
  background: hsl(var(--background));
  .add {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;

    bottom: 10px;
    left: 50%;

    transform: translateX(-50%);

    position: absolute;
  }

  .curved {
    height: 50px;
    width: 50px;
    padding: 0;
    border-radius: 50%;
  }

  .device-list {
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-around;
    gap: 15px 5%;

    padding: 1rem;
    width: 100%;
    max-width: 500px;
    align-content: flex-start;

    // height: 100%;

    .device {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 47.5%;
      height: 100px;

      background: hsl(var(--secondary));
      color: hsl(var(--foreground));
      border-radius: 25px;
    }
  }
}
</style>
