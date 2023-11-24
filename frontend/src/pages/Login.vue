<template>
  <div class="container">
    <div class="screen">
      <div class="screen__content">
        <!-- LOGIN METHOD -->
        <form class="login" @submit.prevent="handleLogin">
          <div class="login__field">
            <i class="login__icon fas fa-user"></i>
            <input type="text" class="login__input" placeholder="Username" v-model="username">
          </div>
          <div class="login__field">
            <i class="login__icon fas fa-lock"></i>
            <input type="password" class="login__input" placeholder="Mot de passe" v-model="password">
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

    
<script setup>
import axios from 'axios'; // Make sure to install axios if not already installed
import '../styles/common.css';
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const password = ref('');
const username = ref('');

const userState = inject('userState');
console.log(userState);

const handleLogin = async () => {
  console.log(userState);
  try {
    const response = await axios.post('http://localhost:3000/signin', {
      username: username.value,
      password: password.value
    });
    console.log(response.data)
    if (response.data.token) {
      // store the token into localStorage
      localStorage.setItem('jwt_token', response.data.token);
      // update the userState
      userState.isAuthenticated = true;
      // Redirect to home after login
      router.push('/');
    } else {
      // Handle error - no token received
      console.error('Login failed: No token received');
      alert('Login failed: No token received, server error ?');
    }
  } catch (error) {
    // Handle error - login request failed
    console.error('Login request failed:', error);
    alert('Login request failed, server error ?');
  }
};

</script>
