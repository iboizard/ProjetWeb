<template>
  <div class="registration-form">
    <form @submit.prevent="submitManagerForm">
      <input type="text" v-model="managerName" placeholder="Nom complet" required>
      <input type="email" v-model="email" placeholder="Adresse Email" required>
      <input type="password" v-model="password" placeholder="Mot de passe" required>

      <div class="project-selector">
        <label for="projectSearch">Rechercher des projets :</label>
        <input type="text" v-model="projectSearch" id="projectSearch" placeholder="Rechercher des projets" />
        <div class="project-list" v-show="filteredProjects.length > 0">
          <div v-for="project in filteredProjects" :key="project.id" class="project-item">
            <div class="project-item">
              <input type="checkbox" v-model="selectedProjects" :value="project.id" id="project.id"
                class="styled-checkbox" />
              <label :for="project.id" class="checkbox-label">{{ project.name }}</label>
            </div>
          </div>
        </div>
      </div>
        <button type="submit">Inscription</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      managerName: '',
      email: '',
      password: '',
      projectSearch: '',
      selectedProjects: [],
      projects: [
        { id: 1, name: 'Projet A' },
        { id: 2, name: 'Projet B' },
        { id: 3, name: 'Projet C' },
        { id: 4, name: 'Projet D' },
        { id: 5, name: 'Projet E' },
        { id: 6, name: 'Projet F' },
        { id: 7, name: 'Projet G' },
        { id: 8, name: 'Projet H' },
        { id: 9, name: 'Projet I' },
        { id: 10, name: 'Projet J' },
      ],
    };
  },
  computed: {
    filteredProjects() {
      return this.projects.filter(project =>
        project.name.toLowerCase().includes(this.projectSearch.toLowerCase())
      );
    },
  },
  methods: {
    submitManagerForm() {
      console.log('Manager de Projet Inscription:', this.managerName, this.email, 'Projets sélectionnés:', this.selectedProjects);
    },
  },
};
</script>

<style scoped>
.registration-form {
  max-width: 400px;
  margin: 0 auto;
}

form {
  display: flex;
  flex-direction: column;
}

input,
select {
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.project-selector {
  position: relative;
}

#projectSearch {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.project-list {
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.project-item {
  display: flex;
  align-items: center;
  padding: 5px;
}

button {
  padding: 10px;
  background-color: #1509f2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}

.styled-checkbox {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #3498db;
  border-radius: 3px;
  display: inline-block;
  position: relative;
  vertical-align: middle;
  cursor: pointer;
}

.styled-checkbox:checked {
  background-color: #3498db;
  border: 2px solid #3498db;
}

.checkbox-label {
  padding-left: 8px;
  vertical-align: middle;
}
</style>
