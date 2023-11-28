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


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>


