<template>
    <div class="home">
      <div class="banner">
        <h1>Bienvenue dans notre CRM</h1>
        <p>La solution tout-en-un pour gérer vos équipes, vos projets, suivre les ventes et centraliser les documents.</p>
      </div>
      
      <div class="features">
        <router-link to="/teams" class="feature">
          <i class="fas fa-users"></i>
          <p>Gérer vos équipes en toute simplicité</p>
        </router-link>
  
        <router-link to="/projects" class="feature">
          <i class="fas fa-tasks"></i>
          <p>Gérer vos projets de manière efficace</p>
        </router-link>
  
        <router-link to="/login" class="feature">
          <i class="fas fa-lock"></i>
          <p>Connectez-vous ou inscrivez-vous pour commencer</p>
        </router-link>
      </div>
    </div>
  </template>
  
  <style scoped>
  .home {
    text-align: center;
    padding: 50px;
  }
  
  .banner {
    background-color: #3498db;
    color: white;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
  }
  
  .features {
    display: flex;
    justify-content: space-around;
  }
  
  .feature {
    flex: 1;
    padding: 20px;
    margin: 10px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  
  .feature:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
  
  .feature i {
    font-size: 48px;
    margin-bottom: 10px;
    color: #3498db;
  }
  
  .feature p {
    font-size: 18px;
    color: #555;
    margin-top: 10px;
  }
  
  @media (max-width: 768px) {
    .features {
      flex-direction: column;
    }
  }
  </style>
  