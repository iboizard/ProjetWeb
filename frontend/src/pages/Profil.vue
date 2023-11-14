<template>
  <section class="top-nav">
    <div>
      Project Manager
    </div>
    <div class="profile-info">
      <div class="avatar"></div>
    </div>
    <ul class="menu">
      <router-link to="/" class="nav-item">Accueil</router-link>
      <router-link to="/projects" class="nav-item">Projets</router-link>
      <router-link to="/teams" class="nav-item">Equipes</router-link>
      <router-link to="/disconnect" class="nav-item">Déconnexion</router-link>
    </ul>
  </section>
    
  <div class="profile-info">
    <h2>{{ userName }}</h2>
    <p>Équipes gérées :</p>
    <ul>
      <li v-for="team in managedTeams" :key="team.id">{{ team.name }}</li>
    </ul>
  </div>

  <img src="../assets/FootPage.png" class="full-width"/>
</template>
<script>
export default {
  data() {
    return {
      userName: "Huguette DUPONT",
      managedTeams: [
        { id: 1, name: "Équipe 1" },
        { id: 2, name: "Équipe 2" },
      ],
    };
  },
};
</script>

<style scoped>
.profile-banner {
  background: linear-gradient(to right, #d9fefa, #83f0da);
  color: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
}

.avatar {
  width: 100px;
  height: 100px;
  background-color: #fff;
  border-radius: 50%;
  margin-top: 85px;
  background-image: url("../assets/user-profil.png");
  background-size: cover;
}

h2 {
  font-size: 24px;
  margin-bottom: 5px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  font-size: 16px;
  margin-bottom: 5px;
}

.full-width {
  width: 100%;
  opacity: 0.5;
  height: auto;
  position: fixed; 
  bottom: 0; 
  left: 0; 
  right: 0; 
  z-index: -1;
}
</style>