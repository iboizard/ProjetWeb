import { createApp } from 'vue'

import router from './router';
import App from './App.vue'

import { reactive, provide } from 'vue';

// get token from localStorage
const token = localStorage.getItem('jwt_token');
const username = "unauthenticated";
// decode the token to get the username
if (token != null) {
    const payloadBase64 = token.split('.')[1];
    const decodedJson = atob(payloadBase64);
    const decoded = JSON.parse(decodedJson);
}



// APP STATE
const userState = reactive({
    isAuthenticated: !!localStorage.getItem('jwt_token'),
    username: username
});

const app = createApp(App);


document.title = "CRM";
app.use(router);
app.provide('userState', userState);
app.mount('#app');


