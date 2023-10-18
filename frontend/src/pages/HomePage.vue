<template>
    <div class="home">
      <div class="banner">
        <h1>Bienvenue dans notre CRM</h1>
      </div>
      
      <div class="features">
        <router-link to="/teams" class="feature">
          <p>Gérer vos équipes en toute simplicité</p>
        </router-link>
  
        <router-link to="/projects" class="feature">
          <p>Gérer vos projets de manière efficace</p>
        </router-link>
  
        <div class="features">
            <router-link v-if="isLoggedIn" to="/profil" class="feature">
                <p>Votre Profil</p>
            </router-link>

            <router-link v-else to="/login" class="feature">
                <p>Connectez-vous ou inscrivez-vous pour commencer</p>
            </router-link>
      
        </div>
    </div>
      <div class="image">
        <img src="../assets/HomePage.jpg" width="300"/>
      </div>
    </div>
  </template>
  
  <script>
    export default {
    data() {
        return {
            isLoggedIn: false, 
        };
    },
    };
</script>

<style scoped>
.home {
  text-align: center;
  padding: 30px;
}

.banner {
  background-color: #3498db;
  color: white;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.features {
  display: flex;
  justify-content: space-around;
}

.feature {
  flex: 1;
  padding: 20px;
  margin: 10px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  width: 450px; 
}

.feature:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.feature i {
  font-size: 48px;
  margin-bottom: 10px;
  color: #3498db;
}

.feature p {
  font-size: 18px;
  color: #555;
  margin-top: 10px;
  text-align: center;   
}
</style>
  