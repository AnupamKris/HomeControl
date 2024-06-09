<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocalStorage } from "@vueuse/core";

const props = defineProps({
  triggerText: {
    type: String,
    default: "Open",
  },
  dialogTitle: {
    type: String,
    default: "Dialog Title",
  },
  dialogDescription: {
    type: String,
    default: "Dialog Description",
  },
  saveText: {
    type: String,
    default: "Save",
  },
});

const settings = useLocalStorage("settings", {
  darkMode: false,
});

const emit = defineEmits(["save"]);

const name = ref("");
const triggerPin = ref("");

const save = () => {
  emit("save", { name: name.value, triggerPin: triggerPin.value });
};
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button>
        {{ triggerText }}
      </Button>
    </DialogTrigger>
    <DialogContent
      class="w-11/12 rounded-md"
      :class="{ dark: settings.darkMode }"
    >
      <DialogHeader>
        <DialogTitle>{{ dialogTitle }}</DialogTitle>
        <DialogDescription>
          {{ dialogDescription }}
        </DialogDescription>
      </DialogHeader>
      <div class="flex flex-col gap-4">
        <div class="field">
          <Label for="name">Name</Label>
          <Input id="name" v-model="name" />
        </div>

        <div class="field">
          <Label for="triggerPin">Trigger URL</Label>
          <Select v-model="triggerPin">
            <SelectTrigger>
              <SelectValue placeholder="Select a Pin" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Pins</SelectLabel>
                <SelectItem value="16"> D0 </SelectItem>
                <SelectItem value="0"> D3 </SelectItem>
                <SelectItem value="2"> D4 </SelectItem>
                <SelectItem value="14"> D5 </SelectItem>
                <SelectItem value="12"> D6 </SelectItem>
                <SelectItem value="13"> D7 </SelectItem>
                <SelectItem value="15"> D8 </SelectItem>
                <SelectItem value="3"> RX </SelectItem>
                <SelectItem value="1"> TX </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <DialogTrigger as-child>
          <Button type="submit" @click="save"> {{ saveText }} </Button>
        </DialogTrigger>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style lang="scss" scoped>
button {
  min-height: 50px;
}
</style>
