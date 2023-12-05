<template>
  <div v-if="isAuthenticated" class="profile-info">
    <h2>{{ userName }}</h2>

    <h3>Voici tous vos employés </h3>
    <div class="Box">
      <li v-for="employee in employees" :key="employee.employee_id" :value="employee.employee_id">
        {{ employee.first_name }} {{ employee.last_name }} - {{ employee.skills }} - {{ employee.status }}
      </li>
    </div>
  </div>
  <button class="buttonAdd" @click="toggleFormVisibilityEmployee">Ajouter un employé</button>
      <form v-if="isEmployee" @submit.prevent="submitFormEmployee()">
        <input type="text" v-model="firstName" placeholder="Prénom" required>
        <input type="text" v-model="lastName" placeholder="Nom de famille" required>
        <input type="text" v-model="skills" placeholder="Compétences" required>
        <input type="text" v-model="status" placeholder="Status ( Junior/Sénior, ... )" required>
        <button type="submit">Ajout de l'employé</button>
      </form>
  <img src="../assets/FootPage.png" class="full-width" />
</template>

<script>
export default {
  data() {
    return {
      isAuthenticated: false,
      userName: '',
      employees: [],
      isEmployee: false,
      firstName:"",
      lastName:"",
      skills:"",
      status:"",
    };
  },
  methods:{
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
    async submitFormEmployee() {
      const token = localStorage.getItem('jwt_token');
      try {
        const response = await fetch(`http://localhost:3000/employees`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            description: this.purchaseDescription,
            first_name: this.firstName,
            last_name: this.lastName,
            skills: this.skills,
            status: this.status,
          }),
        });

        if (response.ok) {
          console.log('Employé inscrit avec succès');
          this.getEmployees();
        } else {
          console.error('Échec de l\'inscription de l employé :', response.statusText);
        }
      } catch (error) {
        console.error('Erreur lors de la requête POST pour l\'inscription du l employé :', error.message);
      }
    },
    toggleFormVisibilityEmployee() {
      this.isEmployee = !this.isEmployee;
    },
  },
  watch: {
    isAuthenticated(newStatus) {
      if (newStatus) {
        const token = localStorage.getItem('jwt_token');
        this.userName = JSON.parse(atob(token.split('.')[1])).username;
      } else {
        this.userName = '';
      }
    }
  },
  created() {
    this.isAuthenticated = !!localStorage.getItem('jwt_token');
  },
  mounted() {
    this.getEmployees();
  }
};
</script>

<style scoped>

.avatar {
  width: 100px;
  height: 100px;
  background-color: #fff;
  border-radius: 50%;
  margin-top: 85px;
  background-image: url("../assets/user-profil.png");
  background-size: cover;
}
.buttonAdd{
  margin-bottom: 2%;
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

.Box {
  height: 100px; 
  overflow: auto; 
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
form {
  display: flex;
  flex-direction: column;
  width: 40%;
  position: center;
  margin: 0 auto; 
  background-color: rgba(255, 255, 255, 0.8) ;
}
</style>