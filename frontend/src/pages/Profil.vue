<template>
  <div v-if="isAuthenticated" class="profile-info">
    <h2>{{ userName }}</h2>
  </div>
  <img src="../assets/FootPage.png" class="full-width"/>
</template>

<script>
export default {
  data() {
    return {
      isAuthenticated: false,
      userName: ''
    };
  },
  watch: {
    isAuthenticated(newStatus) {
      if (newStatus) {
        const token = localStorage.getItem('jwt_token');
        this.userName = JSON.parse(atob(token.split('.')[1])).username;
      } else {
        this.userName = '';
      }
    }
  },
  created() {
    this.isAuthenticated = !!localStorage.getItem('jwt_token');
  },
};
</script>

<style scoped>
.profile-banner {
  background: linear-gradient(to right, #d9fefa, #83f0da);
  color: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
}

.avatar {
  width: 100px;
  height: 100px;
  background-color: #fff;
  border-radius: 50%;
  margin-top: 85px;
  background-image: url("../assets/user-profil.png");
  background-size: cover;
}

h2 {
  font-size: 24px;
  margin-bottom: 5px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  font-size: 16px;
  margin-bottom: 5px;
}

.full-width {
  width: 100%;
  opacity: 0.5;
  height: auto;
  position: fixed; 
  bottom: 0; 
  left: 0; 
  right: 0; 
  z-index: -1;
}
</style>