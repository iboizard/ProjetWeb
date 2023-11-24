<template>
  <div class="project-page">
    <h2>Projets</h2>
    <select v-model="selectedProjectId" @change="selectProject">
      <option value="">Sélectionnez un projet</option>
      <option v-for="project in availableProjects" :key="project.project_id" :value="project.project_id">{{ project.name }}</option>
    </select>

    <div class="project-page-selected" v-if="selectedProjectId && selectedProject">
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

    <div class="registration-form">
      <div class="tabs">
        <button class="navButton" @click="toggleFormVisibility">Inscription Projet</button>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedProjectId: "",
      selectedProject: null,
      isProject: false,
      availableProjects: [],
      selectedExistingProject: "",
      projectName: "",
      description: "",
      objectives: "",
      deadline: "",
      budget: "",
      members: "",
    };
  },
  methods: {
    selectProject() {
      this.selectedProject = this.availableProjects.find((project) => project.project_id === parseInt(this.selectedProjectId));
    },
    submitProjectForm() {
      console.log(
        'Inscription Projet:',
        this.projectName,
        this.description,
        this.objectives,
        this.deadline,
        this.budget,
        this.members
      );
    },
    toggleFormVisibility() {
      this.isProject = !this.isProject;
    },
    async getProjects() {
      try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDA4MTY0MTcsImV4cCI6MTcwMDgyMDAxN30.jAgakywx_msyy5Qmi6OaVZUcUxrkMJ-PWV_lyC1fLuI';
        const response = await fetch('http://localhost:3000/projects', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        this.availableProjects = data;
        console.log(this.availableProjects);
      } catch (error) {
        console.error('Erreur lors de la récupération des projets :', error.message);
      }
    },
  },
  mounted() {
    this.getProjects();
  },
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

h2 {
  color: #ffc3a8;
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

.navButton {
  width: 40%;
}


button:hover {
  background-color: #2980b9;
}
</style>