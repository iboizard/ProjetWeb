import { createApp } from 'vue'

import { router } from './router';
import App from './App.vue'

import io from 'socket.io-client';

const app = createApp(App);

// Connect to Socket.IO server
const socket = io('http://localhost:3000');

socket.on('connect', () => {
    console.log('Connected to the server');
});

socket.on('connect_error', (error) => {
    console.error('Connection failed:', error);
});

// Make socket instance available in all components
app.config.globalProperties.$socket = socket;

document.title = "CRM" ;
app.use(router);
app.mount('#app');
