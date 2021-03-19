import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import BaseCard from './components/BaseCard.vue';
import BaseButton from './components/BaseButton.vue';
import GridView from './components/GridView.vue';
import GoogleGrid from './components/GoogleGrid.vue';
const app =createApp(App);

app.component('base-card',BaseCard);
app.component('base-button',BaseButton);
app.component('grid-view' , GridView);
app.component('google-grid',GoogleGrid);
app.use(store);
app.use(router);
app.mount('#app');