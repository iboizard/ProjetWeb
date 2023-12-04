<template>
  <div>
    <div class="chat-toggle" @click="toggleChat">{{ isChatVisible ? 'Réduire le Chat' : 'Ouvrir le Chat' }}</div>
    <div v-show="isChatVisible" class="chat-popup">
      <ul id="messages">
        <li v-for="msg in messages" :key="msg">{{ msg }}</li>
      </ul>
      <input v-model="message" @keyup.enter="sendMessage">
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import { socket, connect } from '../socket';  
const message = ref('');
const messages = ref([]);

const token = localStorage.getItem('jwt_token');
const userState = inject('userState');
const isChatVisible = ref(true);

if(!socket) {
  connect(token);
}

socket.on('chat message', (msg) => {
  messages.value.push(msg);
});

const sendMessage = () => {
  socket.emit('chat message', userState.username + ' : ' + message.value);
  message.value = '';
};

const toggleChat = () => {
  isChatVisible.value = !isChatVisible.value;
};
</script>

<style>
.chat-popup {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  height: 400px;
  border: 1px solid #ddd;
  background-color: white;
  z-index: 1000;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.chat-toggle {
  position: fixed;
  bottom: 10px;
  right: 10px;
  background-color: #3498db;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  z-index: 1001;
  width: 10%;
}

#messages {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

#messages li {
  padding-left: 4%;
  padding-top: 2%;
  text-align: left;
}
</style>
