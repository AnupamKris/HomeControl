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

const props = defineProps({
  scan: "function",
  stopScan: "function",
});

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
