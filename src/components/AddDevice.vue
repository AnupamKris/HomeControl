<script setup>
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@vueuse/core";
import { QrCode, X } from "lucide-vue-next";

import {
  BarcodeScanner,
  BarcodeFormat,
  LensFacing,
} from "@capacitor-mlkit/barcode-scanning";

const settings = useLocalStorage("settings", {
  darkMode: false,
});

const controls = ref([]);
const serverIp = ref("");
const deviceName = ref("");

const pinTranslation = {
  16: "D0",
  0: "D3",
  2: "D4",
  14: "D5",
  12: "D6",
  13: "D7",
  15: "D8",
  3: "RX",
  1: "TX",
};

const saveControl = (data) => {
  controls.value.push(data);
};

const emit = defineEmits(["save"]);

const scanning = ref(false);

const scanSingleBarcode = async () => {
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

const save = () => {
  if (!serverIp.value || !controls.value || !deviceName.value) {
    return;
  }
  emit("save", {
    serverIp: serverIp.value,
    controls: controls.value,
    name: deviceName.value,
  });
};

onMounted(() => {
  console.log(localStorage.getItem("devices"));
});
</script>

<template>
  <div class="barcode-overlay" v-if="scanning">
    <div class="icon">
      <X @click="stopScan" />
    </div>
  </div>
  <Drawer>
    <DrawerTrigger as-child>
      <slot />
    </DrawerTrigger>
    <DrawerContent :class="{ dark: settings.darkMode }">
      <DrawerHeader>
        <DrawerTitle>Add New Device</DrawerTitle>
        <DrawerDescription>Configure new ESP Device.</DrawerDescription>
      </DrawerHeader>
      <div class="container">
        <Button @click="scan">Scan QR<QrCode class="ml-5" /></Button>
        <div class="field">
          <Label for="deviceName">Name</Label>
          <Input
            id="deviceName"
            v-model="deviceName"
            placeholder="Enter a Device Name"
          />
        </div>
        <div class="field">
          <Label for="address">Node server address</Label>
          <Input id="address" v-model="serverIp" placeholder="Server Address" />
        </div>

        <div class="controls">
          <div class="control" v-for="control in controls" :key="control.name">
            <p>{{ control.name }}</p>
            <p>
              {{ pinTranslation[control.triggerPin] }}/{{ control.triggerPin }}
            </p>
          </div>
        </div>

        <UDialog
          triggerText="Add Control"
          dialogTitle="Add New Control"
          dialogDescription="Configure control settings."
          saveText="Save"
          @save="saveControl"
        />
      </div>
      <DrawerFooter>
        <DrawerClose>
          <Button @click="save">Submit</Button>
        </DrawerClose>
        <DrawerClose>
          <Button variant="link"> Cancel </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

button {
  min-height: 50px;
}

.field {
  display: flex;
  flex-direction: column;
  label {
    color: hsl(var(--muted-foreground));
    margin-bottom: 10px;
  }

  input {
    color: hsl(var(--foreground));
    border: 1px solid hsl(var(--border));
    border-radius: 0.375rem;
    height: 50px;
    font-size: 1rem;
    width: 100%;
  }
}

.barcode-overlay {
  position: fixed;

  top: -100px;
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

.controls {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .control {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;

    border-bottom: 1px solid hsl(var(--border));
  }
}
</style>
