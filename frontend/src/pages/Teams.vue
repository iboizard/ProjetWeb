<template>
  <section class="top-nav">
    <div>
      Project Manager
    </div>
    <ul class="menu">
      <router-link to="/" class="nav-item">Accueil</router-link>
      <router-link to="/projects" class="nav-item">Projets</router-link>
      <router-link to="/disconnect" class="nav-item">Déconnexion</router-link>
      <router-link to="/profil" class="nav-item">Profil</router-link>
    </ul>
  </section>

  <h2>Équipes</h2>
  <div v-for="team in teams" :key="team.id">

    <div class="team-page">
      <h3>{{ team.name }}</h3>

      <div v-if="team.members.length > 0">
        <h4>Membres de l'Équipe</h4>
        <ul>
          <li v-for="member in team.members" :key="member.id">
            {{ member.name }} - {{ member.skills.join(', ') }}
            <button class="delete-button" @click="deleteMember(team.id, member.id)">Supprimer</button>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Aucun membre dans l'équipe pour le moment.</p>
      </div>

      <div v-if="team.skills.length > 0">
        <h4>Compétences de l'Équipe</h4>
        <ul>
          <li v-for="skill in team.skills" :key="skill">{{ skill }}</li>
        </ul>
      </div>
      <div v-else>
        <p>Aucune compétence spécifiée pour l'équipe.</p>
      </div>

      <button @click="addMember(team.id)" class="add-button">Ajouter un Membre</button>

      <button @click="reportUnderstaffed(team.id)" class="understaff-button">Signaler un Manque d'Effectif</button>
    </div>
  </div>
</template>
  
<script>

export default {
  data() {
    return {
      teams: [
        {
          id: 1,
          name: 'Équipe A',
          members: [
            { id: 1, name: 'John Doe', skills: ['JavaScript', 'HTML', 'CSS'] },
            { id: 2, name: 'Alice Smith', skills: ['Python', 'Django', 'SQL'] }
          ],
          skills: ['JavaScript', 'HTML', 'CSS', 'Python', 'Django']
        },
        {
          id: 2,
          name: 'Équipe B',
          members: [
            { id: 1, name: 'Bob Johnson', skills: ['Java', 'Spring', 'Hibernate'] }
          ],
          skills: ['Java', 'Spring', 'Hibernate']
        }
      ]
    };
  },
};
</script>
  
<style scoped>
.team-page {
  width: 500px;
  margin: 0 auto;
  padding: 30px;
  background-color: #effffe;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

h2{
  color: #febca3;
}

h3{
  color: #63dcf1
}
ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button.add-button {
  background-color: #30afdb;
}

button.delete-button {
  background-color: #ffc3a8;
}

button.understaffed-button {
  background-color: #ffeab4;
}
</style>
  