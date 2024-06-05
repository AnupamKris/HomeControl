import { createRouter, createWebHistory } from "vue-router";
import { App, URLOpenListenerEvent } from "@capacitor/app";

import HomeView from "../views/HomeView.vue";
import DashboardView from "../views/DashboardView.vue";
import Toggle from "../components/Toggle.vue";

import { useServerStore } from "@/stores/server";
import { useLocalStorage } from "@vueuse/core";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
      meta: {
        requiresIp: true,
      },
    },
    {
      path: "/toggle",
      name: "toggle",
      component: Toggle,
      meta: {
        requiresIp: true,
      },
    },
  ],
});

router.beforeEach(async (to) => {
  if (to.meta.requiresIp) {
    // check local storage for server ip
    const serverIp = useLocalStorage("serverIp");
    if (!serverIp.value) {
      return {
        path: "/",
        query: {
          redirect: to.fullPath,
        },
      };
    }
  }
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
