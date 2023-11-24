<template>
    <div class="registration-form">
  
      <form @submit.prevent="submitProjectForm">
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


  </style>
  