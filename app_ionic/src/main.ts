import { createApp } from "vue";
import vuetify from "./plugins/vuetify";
import VueApexCharts from "vue3-apexcharts";

import "./style/style.css";
import App from "./AppLauncher.vue";

createApp(App).use(vuetify).use(VueApexCharts).mount("#app");
