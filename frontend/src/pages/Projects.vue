<template>    
    <section class="top-nav">
    <div>
      METTRE UN LOGO
    </div>
    <input id="menu-toggle" type="checkbox" />
    <label class='menu-button-container' for="menu-toggle">
      <div class='menu-button'></div>
    </label>
    <ul class="menu">
      <router-link to="/" class="nav-item">Accueil</router-link>
        <router-link to="/teams" class="nav-item">Equipes</router-link>
      <router-link to="/disconnect" class="nav-item">Déconnexion</router-link>
      <router-link to="/profil" class="nav-item">Profil</router-link>
    </ul>
  </section>
    <div class="projects">
        <h1>Projects</h1>
    </div>
</template>
<script>
</script>
<style>
.navbar {
  background-color: #3498db;
  color: white;
  padding: 10px 0;
  display: flex;
  justify-content: space-around;
}

.nav-item {
  text-decoration: none;
  color: white;
  margin: 0 20px;
  transition: opacity 0.3s ease;
}

.nav-item:hover {
  opacity: 0.8;
}
</style>