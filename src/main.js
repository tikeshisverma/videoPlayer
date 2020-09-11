import Vue from "vue";
import App from "./App.vue";

import fullscreen from 'vue-fullscreen'

  Vue.use(fullscreen)

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret , faPlay, faVolumeUp,faExpand, faPause, faVolumeMute, faVolumeDown, faVolumeOff} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
 
library.add(faUserSecret, faPlay, faVolumeUp, faExpand, faPause, faVolumeMute, faVolumeDown, faVolumeOff)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
