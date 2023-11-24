<template>
  <div>
    <ul id="messages">
      <li v-for="msg in messages" :key="msg">{{ msg }}</li>
    </ul>
    <input v-model="message" @keyup.enter="sendMessage">
    <button @click="sendMessage">Send</button>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      message: '',
      messages: []
    };
  },
  mounted() {
    this.$socket.on('chat message', (msg) => {
      this.messages.push(msg);
    });
  },
  methods: {
    sendMessage() {
      this.$socket.emit('chat message', this.message);
      this.message = '';
    }
  }
};
</script>
  
<style>

#messages {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

</style>