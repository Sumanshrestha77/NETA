import "./bootstrap";
import { createApp } from "vue";

// Import Home component instead of App
import Home from "./pages/Home.vue";

const app = createApp(Home);
app.mount("#app");
