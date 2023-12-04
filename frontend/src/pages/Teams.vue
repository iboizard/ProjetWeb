<template>

  <div class="teams-page">
    <h2>Équipes</h2>
    <select v-model="selectedTeamId" @change="loadTeam">
      <option value="">Sélectionnez une équipe</option>
      <option v-for="team in teams" :key="team.team_id" :value="team.team_id">{{ team.name }}</option>
    </select>

    <div v-if="selectedTeam">
      <div class="team-page">
        <h3>{{ selectedTeam.name }}</h3>

        <div>
          <h4>Membres de l'Équipe</h4>
          <ul>
            <li v-for="employee in selectedTeam.employees" :key="employee.employee_id">
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
          <button @click="addMember(selectedTeamId)" class="add-button">Ajouter</button>
          <button @click="showAddMemberModal = false">Annuler</button>
        </div>
      </div>
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
      selectedTeamId: "",
      selectedTeam: null,
    };
  },
  methods: {
    async getTeams() {
      const token = localStorage.getItem('jwt_token');
      try {
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
      } catch (error) {
        console.error('Erreur lors de la récupération des équipes :', error.message);
      }
    },
    async addMember(teamId) {
      const token = localStorage.getItem('jwt_token');
      try {
        await fetch(`http://localhost:3000/teams/${teamId}/employees/${this.selectedEmployeeId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        console.log(`Ajouter un membre à l'équipe avec l'ID ${teamId}, Employé avec l'ID ${this.selectedEmployeeId}`);
        this.showAddMemberModal = false;

        const updatedTeam = this.teams.find(t => t.team_id === teamId);
        if (updatedTeam) {
          const employeesResponse = await fetch(`http://localhost:3000/teams/${teamId}/employees`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          const employeesData = await employeesResponse.json();
          updatedTeam.employees = employeesData;

          this.$set(this.teams, this.teams.indexOf(updatedTeam), Object.assign({}, updatedTeam));
        }
      } catch (error) {
        console.error('Erreur lors de l\'ajout du membre à l\'équipe :', error.message);
      }
    },

    async getEmployees() {
      const token = localStorage.getItem('jwt_token');
      try {
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
    loadTeam() {
      this.selectedTeam = this.teams.find(team => team.team_id === parseInt(this.selectedTeamId));
    },
  },
  mounted() {
    this.getEmployees();
    this.getTeams();
  },
};
</script>
  
<style scoped>
.teams-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

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
