import { createApp, defineAsyncComponent } from "vue";
import App from "./App.vue";
import "./assets/css/styles.css";

import router from "./router";

import store from "./store/index.js";

import BaseCard from "./components/UI/BaseCard.vue";
import BaseButton from "./components/UI/BaseButton.vue";
import BaseBadge from "./components/UI/BaseBadge.vue";

const BaseSpinner = defineAsyncComponent(() =>
  import("./components/UI/BaseSpinner.vue")
);

const app = createApp(App);

app.use(router);
app.use(store);
app.component("BaseCard", BaseCard);
app.component("BaseButton", BaseButton);
app.component("BaseBadge", BaseBadge);
app.component("BaseSpinner", BaseSpinner);
app.mount("#app");
