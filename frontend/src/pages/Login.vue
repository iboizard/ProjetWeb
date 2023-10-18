<template>
    <div class="box">
    
     
      <h1>Se connecter</h1>
     
      <div class="in">
          <label for="name">Adresse Mail</label>
        
          <div>  <input type="text" v-model="username" placeholder="E-mail"
               /><img v-if="username.length >= 4" alt=""></div>

      </div>
    
      <div class="in">
      <label for="name">Mot de passe</label>
      <div>
          <input v-model="password" type="password" :name="string" placeholder="Entrer votre mot de passe" required/><img v-if="password.length >= 8" alt="">
      </div>
    
      </div>
    
    
    
      <button class="log">
        Se connecter
        </button>
       
    <br/>
    <span>Pas encore de compte ? <a href="/signup">S'inscrire</a> </span> 
    </div>
    
    </template>
    
    
    <script>
    export default {
    
      data() {
        return {
          password:"",
          userLoggedIn: false,
          username:"",    
          isActive: false,
        };
        
      },toggle() {
    this.isActive = ! this.enable ;
    },
    };
    
    </script>
    
    
    
    