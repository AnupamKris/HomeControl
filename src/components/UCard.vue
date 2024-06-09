<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ title }}</CardTitle>
      <CardDescription v-if="description">
        {{ description }}
      </CardDescription>
    </CardHeader>
    <CardContent class="space-y-2">
      <!-- <div class="space-y-1">
        <Label for="name">Name</Label>
        <Input id="name" default-value="Pedro Duarte" />
      </div>
      <div class="space-y-1">
        <Label for="username">Username</Label>
        <Input id="username" default-value="@peduarte" />
      </div> -->
      <slot />
    </CardContent>
    <CardFooter>
      <Button @click="action">Save changes</Button>
    </CardFooter>
  </Card>
</template>

<script setup>
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  action: {
    type: Function,
    default: () => {},
  },
});
</script>

<style lang="scss" scoped></style>
