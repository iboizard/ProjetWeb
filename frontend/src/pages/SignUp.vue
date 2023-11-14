<template>
  <div class="registration-form">

    <form @submit.prevent="submitManagerForm">
      <input type="text" v-model="managerName" placeholder="Nom complet" required>
      <label>Choisissez un ou plusieurs Projets :</label>
      <select v-model="selectedProjects" multiple required>
          <option v-for="project in projects" :key="project.id" :value="project.id">{{ project.name }}</option>
      </select>
      <input type="email" v-model="email" placeholder="Adresse Email" required>
      <button type="submit">Inscription</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isManager: true,
      managerName: '',
      projectName: '',
      email: '',
      description: '',
      objectives: '',
      deadline: '',
      budget: '',
      members: '',
      projects: [
      { id: 1, name: 'Projet A' },
      { id: 2, name: 'Projet B' },
      { id: 3, name: 'Projet C' },
    ],
    };
  },
  methods: {
    submitManagerForm() {
      console.log('Manager de Projet Inscription:', this.managerName, this.projectName, this.email);
    },
  },
};
</script>

<style scoped>
.registration-form {
  max-width: 400px;
  margin: 0 auto;
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
  background-color: #1509f2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}


</style>
