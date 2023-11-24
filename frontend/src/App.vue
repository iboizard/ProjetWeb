<template>
  <div>
    <MenuBarComponent v-if="shouldShowNavBar" />
    <router-view></router-view>
    <ChatComponent v-if="isUserAuthenticated" id="chat-component"/>
  </div>
</template>

<script setup>
  import ChatComponent from './components/Chat.vue';
  import MenuBarComponent from './components/MenuBar.vue';
  import { inject, computed } from 'vue';
  import { useRoute } from 'vue-router';

  const userState = inject('userState');
  const isUserAuthenticated = computed(() => userState.isAuthenticated);
  const currentRoute = useRoute();

  const shouldShowNavBar = computed(() => {
  const excludedRoutes = ['/disconnect', '/login', '/signup'];
  return !excludedRoutes.includes(currentRoute.path);
});
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

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>


