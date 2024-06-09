<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const props = defineProps({
  triggers: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <Tabs default-value="dashboard" class="w-full h-full flex flex-col">
    <slot />
    <TabsList class="grid w-full grid-cols-2 mt-[10px]">
      <TabsTrigger :value="tab.toLowerCase()" v-for="tab in triggers">
        {{ tab }}
      </TabsTrigger>
    </TabsList>
  </Tabs>
</template>
