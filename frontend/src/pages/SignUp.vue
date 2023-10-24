<template>
    <div class="registration-form">
      <div class="tabs">
        <button :class="{ activeTab: isManager }" @click="isManager = true">Manager de Projet</button>
        <button :class="{ activeTab: !isManager }" @click="isManager = false">Inscription Projet</button>
      </div>
  
      <form v-if="isManager" @submit.prevent="submitManagerForm">
        <input type="text" v-model="managerName" placeholder="Nom complet" required>
        <label>Choisissez un ou plusieurs Projets :</label>
        <select v-model="selectedProjects" multiple required>
            <option v-for="project in projects" :key="project.id" :value="project.id">{{ project.name }}</option>
        </select>
        <input type="email" v-model="email" placeholder="Adresse Email" required>
        <button type="submit">Inscription</button>
      </form>
  
      <form v-else @submit.prevent="submitProjectForm">
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
      submitProjectForm() {
        console.log('Inscription Projet:', this.projectName, this.description, this.objectives, this.deadline, this.budget, this.members);
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

  .screen__background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  -webkit-clip-path: inset(0 0 0 0);
  clip-path: inset(0 0 0 0);
}

  </style>
  