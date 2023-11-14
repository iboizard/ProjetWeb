<template>
  <section class="top-nav">
    <div class="nav-title">
       Project Manager
    </div>
    <ul class="menu">
      <router-link to="/teams" class="nav-item">Equipes</router-link>
      <router-link to="/projects" class="nav-item">Projets</router-link>
      <router-link to="/disconnect" class="nav-item">Déconnexion</router-link>
      <router-link to="/profil" class="nav-item">Profil</router-link>
    </ul>
  </section>

  <div class="home">
    <div class="image">
      <img src="../assets/websiteLogo.png" width="500" />
    </div>
  </div>
</template>
  
<script>
import '../styles/common.css'
export default {
  data() {
    return {
      isLoggedIn: false,
    };
  },
};
</script>

<style>

body{
  background-color: #d9fefa;
}

.home {
  text-align: center;
}
</style>
  