<template>
  <div class="devices">
    <div class="barcode-overlay" v-if="scanning">
      <div class="icon">
        <X @click="stopScan" />
      </div>
    </div>
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
      <AddDevice @save="addDevice" :scan :stopScan>
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
import { X } from "lucide-vue-next";
import {
  BarcodeScanner,
  BarcodeFormat,
  LensFacing,
} from "@capacitor-mlkit/barcode-scanning";

const devices = useLocalStorage("devices", []);
const router = useRouter();

const scanning = ref(false);

const addDevice = (data) => {
  devices.value.push(data);
};

const scanSingleBarcode = async () => {
  scanning.value = true;
  return new Promise(async (resolve) => {
    document.querySelector("body")?.classList.add("barcode-scanner-active");

    const listener = await BarcodeScanner.addListener(
      "barcodeScanned",
      async (result) => {
        await listener.remove();
        document
          .querySelector("body")
          ?.classList.remove("barcode-scanner-active");
        await BarcodeScanner.stopScan();
        scanning.value = false;
        resolve(result.barcode);
      }
    );

    await BarcodeScanner.startScan();
  });
};

const scan = async () => {
  scanning.value = true;
  let qr = await scanSingleBarcode();
  // let data = JSON.parse(qr);
  console.log(qr.rawValue);
  scanning.value = false;
};

const stopScan = async () => {
  await BarcodeScanner.stopScan();
  scanning.value = false;
  document.querySelector("body")?.classList.remove("barcode-scanner-active");
};

const goToDevice = (index) => {
  router.push("/device/" + index);
};
</script>

<style lang="scss" scoped>
.barcode-overlay {
  position: fixed;

  top: 0px;
  left: 0px;

  width: 100vw;
  height: 100vh;
  z-index: 1000;
  visibility: visible;

  background: rgba(0, 0, 0, 0.5);

  .icon {
    bottom: 50px;
    height: 50px;
    width: 50px;

    background: #ff4f4f;

    position: absolute;

    left: 50%;
    transform: translateX(-50%);

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 50%;

    svg {
      stroke: #fff;
    }
  }
}
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
