<template>
  <section class="top-nav">
    <div class="nav-title">
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
  <div v-for="team in teams" :key="teams.team_id">

    <div class="team-page">
      <h3>{{ team.name }}</h3>

      <div>
        <h4>Membres de l'Équipe</h4>
        <ul>
          <li v-for="employee in team.employees" :key="employee.employee_id">
            {{ employee.first_name }} {{ employee.last_name }} - {{ employee.skills }} - {{ employee.status }}
          </li>
        </ul>
      </div>

      <button @click="showAddMemberModal = true" class="add-button">Ajouter un Membre</button>

      <div v-if="showAddMemberModal" class="modal">
        <h3>Choisissez un employé</h3>
        <select v-model="selectedEmployeeId">
          <option v-for="employee in employees" :key="employee.employee_id" :value="employee.employee_id">
            {{ employee.first_name }} {{ employee.last_name }} - {{ employee.skills }} - {{ employee.status }}
          </option>
        </select>
        <button @click="addMember(team.id)" class="add-button">Ajouter</button>
        <button @click="showAddMemberModal = false">Annuler</button>
      </div>

      <button @click="reportUnderstaffed(team.id)" class="understaff-button">Signaler un Manque d'Effectif</button>
    </div>
  </div>
</template>
  
<script>

export default {
  data() {
    return {
      teams: [], 
      employees: [], 
      selectedEmployeeId: null, 
      showAddMemberModal: false, 
    };
  },
  methods: {
    async getTeams() {
      try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDA1ODQ0NTIsImV4cCI6MTcwMDU4ODA1Mn0.m5mze4vcevnNe6-Vf8SIWXe6AqIx9QZ2yjYhJWrHlKg';
        const response = await fetch('http://localhost:3000/teams', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        this.teams = data;
        for (const team of this.teams) {
          const employeesResponse = await fetch(`http://localhost:3000/teams/${team.team_id}/employees`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          const employeesData = await employeesResponse.json();
          team.employees = employeesData;
        }
        console.log(this.teams);
      } catch (error) {
        console.error('Erreur lors de la récupération des équipes :', error.message);
      }
    },
    async addMember(teamId) {
      try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDA1ODQ0NTIsImV4cCI6MTcwMDU4ODA1Mn0.m5mze4vcevnNe6-Vf8SIWXe6AqIx9QZ2yjYhJWrHlKg';
        await fetch(`http://localhost:3000/teams/${teamId}/employees/${this.selectedEmployeeId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        console.log(`Ajouter un membre à l'équipe avec l'ID ${teamId}, Employé avec l'ID ${this.selectedEmployeeId}`);
        this.showAddMemberModal = false; // Masquer la liste déroulante après l'ajout
      } catch (error) {
        console.error('Erreur lors de l\'ajout du membre à l\'équipe :', error.message);
      }
    },
    async getEmployees() {
      try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDA1ODQ0NTIsImV4cCI6MTcwMDU4ODA1Mn0.m5mze4vcevnNe6-Vf8SIWXe6AqIx9QZ2yjYhJWrHlKg';
        const response = await fetch('http://localhost:3000/employees', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        const data = await response.json();
        this.employees = data;
      } catch (error) {
        console.error('Erreur lors de la récupération des employés :', error.message);
      }
    },
  },
  mounted() {
    this.getEmployees();
    this.getTeams();
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

h2 {
  color: #febca3;
}

h3 {
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
  