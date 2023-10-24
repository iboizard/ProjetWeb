<template>
    <div class="container">
      <div class="screen">
        <div class="screen__content">
          <form class="login">
          <br/>
          <br/>
          <br/>
              <h3>Vous êtes déconnecté</h3>
          </form>
          <div class="social-signup-div">
            <a class="social-signup-href" href="/signup">S'inscrire</a>
            <a class="social-signup-href" href="/login">Se connecter</a>
        </div>
        </div>
        <div class="screen__background">
          <span class="screen__background__shape screen__background__shape4"></span>
          <span class="screen__background__shape screen__background__shape3"></span>
          <span class="screen__background__shape screen__background__shape2"></span>
          <span class="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  </template>
      
      
  <script>
  import '../styles/common.css'
  
  export default {
  
    data() {
      return {
        password: "",
        userLoggedIn: false,
        username: "",
        isActive: false,
      };
  
    }, toggle() {
      this.isActive = !this.enable;
    },
  };
  
  </script>
  
      