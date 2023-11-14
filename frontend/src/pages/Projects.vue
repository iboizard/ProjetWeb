<template>
  <section class="top-nav">
    <div> 
      Project Manager
    </div>
    <ul class="menu">
      <router-link to="/" class="nav-item">Accueil</router-link>
      <router-link to="/teams" class="nav-item">Equipes</router-link>
      <router-link to="/disconnect" class="nav-item">Déconnexion</router-link>
      <router-link to="/profil" class="nav-item">Profil</router-link>
    </ul>
  </section>
  <div class="project-page">
    <h2>Projets</h2>
    <select v-model="selectedProjectId" @change="selectProject">
      <option value="">Sélectionnez un projet</option>
      <option v-for="project in projects" :key="project.id" :value="project.id">{{ project.name }}</option>
    </select>

    <div class="project-page-selected" v-if="selectedProject">
      <h3>Description du Projet</h3>
      <p>{{ selectedProject.description }}</p>

      <h3>Date Limite</h3>
      <p>{{ selectedProject.deadline }}</p>

      <h3>Pulse-check</h3>
      <p v-if="selectedProject.canCreatePulseCheck">Le manager peut créer un Pulse-check.</p>
      <p v-else>Le manager ne peut pas créer de Pulse-check.</p>

      <h3>Résultat de la Dernière Session</h3>
      <p>{{ selectedProject.lastSessionResult }}</p>
    </div>
  </div>

  <div class="registration-form">
    <div class="tabs">
      <button @click="toggleFormVisibility">Inscription Projet</button>
    </div>

    <form v-if="isProject" @submit.prevent="submitProjectForm">
      <input type="text" v-model="projectName" placeholder="Nom du Projet" required>
      <textarea v-model="description" placeholder="Description du Projet" required></textarea>
      <input type="text" v-model="objectives" placeholder="Objectifs du Projet" required>
      <input type="date" v-model="deadline" required>
      <input type="number" v-model="budget" placeholder="Budget du Projet" required>
      <input type="text" v-model="members" placeholder="Membres du Projet (séparés par des virgules)" required>
 
      <button type="submit">Inscription</button>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedProjectId: "",
      projects: [
        {
          id: 1,
          name: "Projet A",
          description: "Description du Projet A",
          deadline: "31-12-2023",
          canCreatePulseCheck: true,
          lastSessionResult: "Satisfaisant"
        },
        {
          id: 2,
          name: "Projet B",
          description: "Description du Projet B",
          deadline: "15-01-2024",
          canCreatePulseCheck: false,
          lastSessionResult: "À améliorer"
        }
      ],
      selectedProject: null, 
      isProject: false,
      projectName: "",
      description: "",
      objectives: "",
      deadline: "",
      budget: "",
      members: ""
    };
  },
  methods: {
    selectProject() {
      this.selectedProject = this.projects.find(project => project.id === parseInt(this.selectedProjectId));
    }, submitProjectForm() {
      console.log('Inscription Projet:', this.projectName, this.description, this.objectives, this.deadline, this.budget, this.members);
    }, toggleFormVisibility() {
      this.isProject = !this.isProject; 
    }
  }
};
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

.project-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.project-page-selected {
  max-width: 600px;
  margin: 0 auto;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

h2{
  color:  #ffc3a8;
}

h3 {
  color: #1d94c3;
}

select {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

p {
  font-size: 16px;
  line-height: 1.5;
  color: #333;
}

.menu-button-container {
  display: none;
}

.menu {
  list-style: none;
  display: flex;
  gap: 20px;
}

.registration-form {
  max-width: 400px;
  margin: 0 auto;
  padding-top: 1%;
}

.tabs {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.activeTab {
  font-weight: bold;
}

form {
  display: flex;
  flex-direction: column;
}

input,
textarea, 
select {
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px;
  background-color: #0d70a5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}

</style>
