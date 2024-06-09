import { createRouter, createWebHistory } from "vue-router";
import { App } from "@capacitor/app";

import HomeView from "../views/HomeView.vue";
import Settings from "../views/Settings.vue";
import Favorites from "../views/Favorites.vue";
import Devices from "../views/Devices.vue";
import DeviceControl from "../views/DeviceControl.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/settings",
      name: "settings",
      component: Settings,
    },
    {
      path: "/favorites",
      name: "favorites",
      component: Favorites,
    },
    {
      path: "/devices",
      name: "devices",
      component: Devices,
    },
    {
      path: "/device/:device",
      name: "device",
      component: DeviceControl,
    },
  ],
});

App.addListener("appUrlOpen", function (event) {
  // Example url: https://beerswift.app/tabs/tabs2
  // slug = /tabs/tabs2
  const slug = event.url.split(".app").pop();

  // We only push to the route if there is a slug present
  if (slug) {
    router.push({
      path: slug,
    });
  }
});

export default router;
