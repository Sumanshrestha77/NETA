import "./bootstrap";
import { createApp } from "vue";
import Home from "./pages/Home.vue";
import "../css/app.css"; //
import router from './router';


app.use(router)
createApp(Home).mount("#home");
