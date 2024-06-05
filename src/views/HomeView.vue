<template>
  <div class="home flex justify-center items-center h-full">
    <Card>
      <CardHeader>
        <CardTitle>Server Setup</CardTitle>
        <CardDescription
          >Setup the server address of the NodeMCU</CardDescription
        >
      </CardHeader>
      <CardContent>
        <Label for="address">Node server address</Label>
        <Input id="address" v-model="serverIp" placeholder="Server Address" />
      </CardContent>
      <CardFooter>
        <Button @click="save">Save</Button>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup>
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useRouter } from "vue-router";
import { useLocalStorage } from "@vueuse/core";

const address = ref("");
const serverIp = useLocalStorage("serverIp");

const router = useRouter();
const save = () => {
  console.log("Server IP saved");
  router.push("/dashboard");
};
</script>

<style lang="scss" scoped></style>
