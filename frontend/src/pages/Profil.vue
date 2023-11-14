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
        <router-link to="/projects" class="nav-item">Projets</router-link>
        <router-link to="/teams" class="nav-item">Equipes</router-link>
        <router-link to="/disconnect" class="nav-item">Déconnexion</router-link>
    </ul>
  </section>
    <div class="profil">
        <h1>Profil</h1>
    </div>
    <div> Image </div>
    <div>Name </div>
</template>