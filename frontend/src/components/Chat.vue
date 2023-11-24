<template>
  <div>
    <ul id="messages">
      <li v-for="msg in messages" :key="msg">{{ msg }}</li>
    </ul>
    <input v-model="message" @keyup.enter="sendMessage">
    <button @click="sendMessage">Send</button>
  </div>
</template>
  
<script setup>


import { ref, inject } from 'vue';
import { socket, connect } from '../socket';  
const message = ref('');
const messages = ref([]);

const token = localStorage.getItem('jwt_token');
const userState = inject('userState');

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

</script>
  
<style>

#messages {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

/* allign the text to the left */
#messages li {
  padding-left: 4%;
  padding-top: 2%;
  text-align: left;
}

</style>