<template>
  <router-view></router-view>
  <ChatComponent id="chat-component"/> <!-- Chat component will be displayed on every page -->
</template>

<script setup>
</script>

<style>
#chat-component {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  height: 400px;
  border: 1px solid #ddd;
  background-color: white;
  z-index: 1000;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
}

</style>




<script>
import ChatComponent from './components/Chat.vue';

export default {
  components: {
    ChatComponent
  }
};
</script>
