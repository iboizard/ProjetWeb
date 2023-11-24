<template>
    
  <div class="profile-info">
    <h2>{{ userName }}</h2>
    <h3>Équipes gérées :</h3>
    <ul>
      <li v-for="team in teams" :key="team.team_id">{{ team.name }}</li>
    </ul>
  </div>

  <img src="../assets/FootPage.png" class="full-width"/>
</template>
<script>
export default {
  data() {
    return {
      userName: "Huguette DUPONT",
      teams: [],
    };
  },
  methods:{
    async getTeams() {
      try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDA4MjI5ODQsImV4cCI6MTcwMDgyNjU4NH0.UYUVHkM8QCJ8sdVe53pA7hJAHe4Ozyuoh2G1qRzBqyc';
        const response = await fetch('http://localhost:3000/teams', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        this.teams = data;
        console.log(this.teams);
      } catch (error) {
        console.error('Erreur lors de la récupération des équipes :', error.message);
      }
    },
  },
  
  mounted() {
    this.getTeams();
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