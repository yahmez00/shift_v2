// Laravel Bootstrap, includes Axios.
require("./bootstrap");

// Core
import Vue from "vue";
import Vuex from "vuex";
import Rewrite from "./Rewrite.vue";
import { store } from "./store/index";
import './vue-bootstrap.js';

// Libraries
import PortalVue from "portal-vue";
import Icon from "vue-awesome/components/Icon";
import './icons.js';

Vue.use(Vuex);
Vue.use(PortalVue);
Vue.component("icon", Icon);

window.Vue = require("vue");

// Suppress error message about "unknown custom element: trix-editor".
Vue.config.ignoredElements = ['trix-editor'];

// The Shift Article creation application.
new Vue({
    store: store,
    render: h => h(Rewrite)
}).$mount("#shift");
