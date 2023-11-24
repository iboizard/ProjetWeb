import { createApp } from 'vue'

import router from './router';
import App from './App.vue'

import io from 'socket.io-client';

import { reactive, provide } from 'vue';

// APP STATE
const userState = reactive({
    isAuthenticated: !!localStorage.getItem('jwt_token')
});

const app = createApp(App);

// JWT
const token = localStorage.getItem('jwt_token');
// Connect to Socket.IO server
const socket = io('http://localhost:3000', {
    auth: {
        token: token
    }
});

socket.on('connect', () => {
    console.log('Connected to the server');
});

socket.on('connect_error', (error) => {
    console.error('Connection failed:', error);
});

// Make socket instance available in all components
app.config.globalProperties.$socket = socket;

document.title = "CRM";
app.use(router);
app.provide('userState', userState);
app.mount('#app');


