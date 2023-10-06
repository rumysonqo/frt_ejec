<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="banner">
    <h1 class="titulo2">EJECUCION PRESUPUESTAL 2023</h1>
  </div>
  <header class="contenedor">
      <figure class="logo"> <img src="../public/LOGO_YOU.png" alt="logo"> </figure>
      <nav>
        <ul class="menu">
          <li><RouterLink to="/">Inicio</RouterLink></li>
          <li><RouterLink to="/por_programa">Por Programa</RouterLink></li>
          <li><RouterLink to="/por_meta">Por Meta</RouterLink></li>
        </ul>
      </nav>
  </header>
  <RouterView />

  
</template>

<style scoped>
  .banner{
    width: 100%;
    padding: 9rem 3rem;
    text-align: center;
    background: url("./assets/fon2.jpg");
    background-color: rgba(0,0,100,.3);
    background-blend-mode: soft-light;
    background-size: cover;
    background-position: center;
    box-sizing: border-box;
  }

  .banner h1{
    color: aqua;
  }

  .contenedor{
    width: 100%;
    height: 60px;
    background: #0471ba;
    display: flex;
    /*justify-content: space-between;*/
    align-items: center;
    padding: 0 5rem;
    box-sizing: border-box;
    position: sticky;
    top: 0;
  }

  .menu{
    display: flex;
    list-style: none;
    margin-top: 15px;
    justify-content: center;
  }

  nav > ul > li > a{
    display: flex;
    color: aliceblue;
    align-items: center;
    padding: 12px 12px;
    border-radius: 10px;
    transition: 0.5s;
    text-transform: uppercase;
    font-size: 18px;
    transition: all 100ms ease;
    text-decoration: none;
  }

  nav > ul > li > a:hover{
    background: #033991;
    box-shadow: 1px 1px 10px 3px #a3eef8;
    border-radius: 10px;
    border-color: #a3eef8;

  }
  

  .main-container{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .arti{
    width: 80%;
  }

  .logo{
    width: 40px;
    background-color: #17def8;
    border-radius: 50%;
    box-shadow: 1px 1px 4px 2px #343745;
    margin: 0;
  }

  .logo img{
    width: 100%;
  }



</style>
