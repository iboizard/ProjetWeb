<template>
  <div class="project-page">
    <h2>Projets</h2>
    <select v-model="selectedProjectId" @change="selectProject">
      <option value="">Sélectionnez un projet</option>
      <option v-for="project in availableProjects" :key="project.project_id" :value="project.project_id">{{ project.name
      }}</option>
    </select>

    <div class="project-page-selected" v-if="selectedProjectId && selectedProject">
      <h3>Description du Projet</h3>
      <p>{{ selectedProject.description }}</p>

      <h3>Date Limite</h3>
      <p>{{ selectedProject.deadline }}</p>

      <h3>Budget</h3>
      <p>{{ selectedProject.budget }} €</p>

      <h3>Objectifs</h3>
      <p>{{ selectedProject.objectives }}</p>

      <h3>Membres du projet</h3>
      <ul>
        <p v-for="member in members" :key="member.user_id">{{ member.name }}</p>
      </ul>

      <h3>Documents</h3>
      <ul>
        <p v-for="document in documents" :key="document.title">
          <a :href="document.link" target="_blank">{{ document.title }}</a>
        </p>
      </ul>

      <h3>Achats</h3>
      <ul>
        <p v-for="purchase in purchases" :key="purchase.purchase_id">
          {{ purchase.title }} : {{ purchase.price }} € <br/>
          <em>{{ purchase.description }}</em>
        </p>
      </ul>

      <button class="aquaButton" @click="toggleFormVisibilityLink">Ajouter des documents</button>
      <form v-if="isLink" @submit.prevent="submitLinkForm(selectedProjectId)">
        <input type="text" v-model="documentName" placeholder="Nom du Document" required>
        <textarea v-model="link" placeholder="Link du Document" required></textarea>

        <button type="submit">Ajout</button>
      </form>

      <button class="aquaButton" @click="toggleFormVisibilityPurchase">Ajouter un achat</button>
      <form v-if="isPurchase" @submit.prevent="submitPurchaseForm(selectedProjectId)">
        <input type="text" v-model="purchaseName" placeholder="Nom de l'achat" required>
        <input type="number" v-model="price" placeholder="Prix" required>
        <textarea v-model="purchaseDescription" placeholder="Description de l'achat" required></textarea>

        <button type="submit">Ajout</button>
      </form>
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

        <button type="submit">Inscription</button>
      </form>
    </div>
  </div>
</template>

<script>
const token = localStorage.getItem('jwt_token');
export default {
  data() {
    return {
      selectedProjectId: "",
      selectedProject: null,
      isProject: false,
      isLink: false,
      isPurchase: false,
      availableProjects: [],
      selectedExistingProject: "",
      projectName: "",
      description: "",
      objectives: "",
      deadline: "",
      budget: "",
      members: "",
      documents:"",
      purchases:"",
      documentName: "",
      link: "",
      purchaseName: "",
      purchaseDescription: "",
      price :"",
    };
  },
  methods: {

    async selectProject() {
      this.selectedProject = this.availableProjects.find((project) => project.project_id === parseInt(this.selectedProjectId));
      
      if (this.selectedProject) {
        await this.getTeams(this.selectedProject.project_id);
        await this.getDocuments(this.selectedProject.project_id);
        await this.getPurchases(this.selectedProject.project_id);

      }
    },
    
    //GET PROJECT TEAM DOCUMENTS PURCHASES
    async getProjects() {
      const token = localStorage.getItem('jwt_token');
      try {
        const response = await fetch('http://localhost:3000/projects', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        this.availableProjects = data;
      } catch (error) {
        console.error('Erreur lors de la récupération des projets :', error.message);
      }
    },
  async getTeams(projectId) {
    const token = localStorage.getItem('jwt_token');
    try {
      const response = await fetch(`http://localhost:3000/projects/${projectId}/teams`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const teams = await response.json();
        this.members = teams; 
      } else {
        console.error('Échec de la récupération des équipes :', response.statusText);
      }
    } catch (error) {
      console.error('Erreur lors de la requête GET pour les équipes :', error.message);
    }
  },
  async getDocuments(projectId) {
    const token = localStorage.getItem('jwt_token');
    try {
      const response = await fetch(`http://localhost:3000/projects/${projectId}/documents`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const docs = await response.json();
        this.documents = docs; 
      } else {
        console.error('Échec de la récupération des documents :', response.statusText);
      }
    } catch (error) {
      console.error('Erreur lors de la requête GET pour les documents :', error.message);
    }
  },
  async getPurchases(projectId) {
    const token = localStorage.getItem('jwt_token');
    try {
      const response = await fetch(`http://localhost:3000/projects/${projectId}/purchases`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const achats = await response.json();
        this.purchases = achats; 
      } else {
        console.error('Échec de la récupération des achats :', response.statusText);
      }
    } catch (error) {
      console.error('Erreur lors de la requête GET pour les achats :', error.message);
    }
  },
    // SUBMIT FORM OF PROJECT DOCUMENT PURCHASE
    async submitProjectForm() {
      const token = localStorage.getItem('jwt_token');
      try {
        const response = await fetch('http://localhost:3000/projects', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.projectName,
            description: this.description,
            objectives: this.objectives,
            deadline: this.deadline,
            budget: this.budget,
          }),
        });

        if (response.ok) {
          console.log('Projet inscrit avec succès');
          this.getProjects();
        } else {
          console.error('Échec de l\'inscription du projet :', response.statusText);
        }
      } catch (error) {
        console.error('Erreur lors de la requête POST pour l\'inscription du projet :', error.message);
      }
    },
    async submitLinkForm(projectId) {
      const token = localStorage.getItem('jwt_token');
      try {
        const response = await fetch(`http://localhost:3000/projects/${projectId}/documents`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: this.documentName,
            link: this.link,
          }),
        });

        if (response.ok) {
          console.log('Projet inscrit avec succès');
          this.getProjects();
          await this.getTeams(projectId);
          await this.getDocuments(projectId);
        } else {
          console.error('Échec de l\'inscription du projet :', response.statusText);
        }
      } catch (error) {
        console.error('Erreur lors de la requête POST pour l\'inscription du projet :', error.message);
      }
    }
    ,
    async submitPurchaseForm(projectId) {
      const token = localStorage.getItem('jwt_token');
      try {
        const response = await fetch(`http://localhost:3000/projects/${projectId}/purchases`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: this.purchaseName,
            price: this.price,
            description: this.purchaseDescription,
          }),
        });

        if (response.ok) {
          console.log('Achat inscrit avec succès');
          this.getProjects();
          await this.getPurchases(projectId);
        } else {
          console.error('Échec de l\'inscription de l achat :', response.statusText);
        }
      } catch (error) {
        console.error('Erreur lors de la requête POST pour l\'inscription du l achat :', error.message);
      }
    }
    ,
    //PRINT FORM OR NOT 
    toggleFormVisibility() {
      this.isProject = !this.isProject;
    },
    
    toggleFormVisibilityLink() {
      this.isLink = !this.isLink;
    },
    
    toggleFormVisibilityPurchase() {
      this.isPurchase = !this.isPurchase;
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

.aquaButton {
  width: 40%;
  background-color: rgb(32, 101, 101);
  margin-right: 2%;
  margin-top: 2%;
}


button:hover {
  background-color: #2980b9;
}
</style>