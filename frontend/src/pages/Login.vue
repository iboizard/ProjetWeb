<template>
  <div class="container">
    <div class="screen">
      <div class="screen__content">
        <form class="login">
          <div class="login__field">
            <i class="login__icon fas fa-user"></i>
            <input type="text" class="login__input" placeholder="Email">
          </div>
          <div class="login__field">
            <i class="login__icon fas fa-lock"></i>
            <input type="password" class="login__input" placeholder="Mot de passe">
          </div>
          <button class="button login__submit">
            <span class="button__text">Se connecter</span>
            <i class="button__icon fas fa-chevron-right"></i>
          </button>
        </form>
        <div class="social-signup-div">
          <a class="social-signup-href" href="/signup">S'inscrire</a>
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
