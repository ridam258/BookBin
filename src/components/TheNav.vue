<template>
    <nav class="navbar">
  <div class="navbar-brand">
    <img class="logo" src="../assets/logo.png" alt="">
    <h1 class="navbar-item is-size-2 has-text-white has-text-weight-bold">BookBin</h1>

    <a class="navbar-burger mt-3 noHover" @click="openBurger" >
      <span></span>
      <span></span>
      <span></span>
    </a>
  </div>
<div class="navbar-menu" :class="{'is-active': activeBurger}">
    <div class="navbar-end">
          <router-link to="/saved_books" class="saved is-size-5 navbar-item px-6">Saved</router-link>
    </div>
</div>
</nav>
</template>

<script>
export default {
  data(){
    return{
      activeBurger:false,
    }
  },
  methods:{
    openBurger(){
      this.activeBurger=!this.activeBurger;
    }
  }
}
</script>

<style scoped>
.logo{
  width:10%
}
.navbar{
  background-color: #1A1927;
}
.saved{
  color: black;
}
.saved:hover{
  background-color: #1a1927;
  color: white;
}
.saved:visited{
  background-color: #1a1927;
  color: white;
}
@media only screen and (min-width: 1024px) {
  .navbar-burger{
      display: none;
  }
  .saved{
    color: white;
  }
}

</style>