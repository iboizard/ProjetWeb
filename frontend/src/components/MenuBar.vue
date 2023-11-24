
<template>
    <section class="top-nav">
        <div class="nav-title">
            Project Manager
        </div>

        <ul class="menu">
            <router-link to="/" class="nav-item">Accueil</router-link>
            <router-link to="/profil" class="nav-item">Profil</router-link>
            <router-link to="/projects" class="nav-item">Projets</router-link>
            <router-link to="/teams" class="nav-item">Equipes</router-link>
            <router-link to="/disconnect" class="nav-item">Déconnexion</router-link>
        </ul>

        <div class="profile-info">
            <div class="avatar"></div>
        </div>
    </section>
</template>