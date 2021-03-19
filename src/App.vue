<template>
<teleport to="body">

<div class="modal" :class="{'is-active':active}">
  <div class="modal-background" @click="closeModal"></div>
  <div class="modal-card">
    <base-card>
    <div class="modalPop has-text-centered">
      <h1>Are you using this website on mobile?</h1>
      <h1>If yes then download it in app created by <a class="has-text-black" style="text-decoration:underline" href="#">Hrishikesh rathore</a> for better experience</h1>
      <a href="http://localhost:8080/home" class="is-size-5">click here</a>
      <br><br><br>
      <h1>This website is created with ❤️ by <br> <a class="has-text-black" style="text-decoration:underline" href="https://ridam258.github.io/Personal-website/">Ridam Jain</a></h1>
      
      <div style="width:100%" class="is-flex is-justify-content-center">
      <button class="button" @click="closeModal">Okay</button>
      </div>
    </div>
</base-card>
      
  </div>
</div>
</teleport>
  
  <div style="font-family: 'Lobster', cursive;" class="is-flex is-justify-content-center  is-hidden-tablet m-2">
    <div class="container"  @click="myFunction()" :class="{change:sideBar}">
  <div class="bar1" ></div>
  <div class="bar2"></div>
  <div class="bar3"></div>
  </div>
    <h1 class="BookBin has-text-black" style="margin-right:40vw">BookBin</h1>
    
  </div>
  <div class="columns">
  <div class="column is-one-fifth is-hidden-mobile">
    <div class=" is-flex is-flex-direction-column is-justify-content-center is-align-items-center logo" style="height:35vh;font-family: 'Lobster', cursive;">
      
      <router-link  to="/home"><h1 class="has-text-weight-bold BookBin">BookBin</h1></router-link>
    </div>
    <div  class=" is-flex is-flex-direction-column is-align-items-center ">
      <base-button title="Home" imgSrc="home" navTo="/home"></base-button>
      <base-button title="Search" imgSrc="search" navTo="/search"></base-button>
      <base-button title="Saved" imgSrc="save" navTo="/saved"></base-button>
      <base-button title="Categories" imgSrc="cat" navTo="/categories"></base-button>
      <base-button title="About" imgSrc="about" navTo="/about"></base-button>
      <!-- <h1 class="is-size-6 has-text-weight-semibold pt-6">Created by Ridam Jain</h1>
      <div class="is-flex">
        <a href="#" class="fa fa-facebook m-3 is-size-5 has-text-black"></a>
      <a href="#" class="fa fa-twitter m-3 is-size-5 has-text-black"></a>
      <a href="#" class="fa fa-github m-3 is-size-5 has-text-black"></a>
      <a href="#" class="fa fa-linkedin m-3 is-size-5 has-text-black"></a>
      <a href="#" class="fa fa-instagram m-3 is-size-5 has-text-black"></a>
      </div> -->
    </div>
  </div>
  <div class="parentSideNav" :class="{hide:!sideBar, visible:sideBar}">
      <div class=" is-flex is-flex-direction-column is-align-items-center is-hidden-tablet sideNav" >
      <base-button title="Home" imgSrc="home" navTo="/home"></base-button>
      <base-button title="Search" imgSrc="search" navTo="/search"></base-button>
      <base-button title="Saved" imgSrc="save" navTo="/saved"></base-button>
      <base-button title="Categories" imgSrc="cat" navTo="/categories"></base-button>
      <base-button title="About" imgSrc="about" navTo="/about"></base-button>
  </div>
  </div>
  
  <div class="column p-0">
    <router-view></router-view>
  </div>
  
</div>

</template>

<script>
import BaseButton from './components/BaseButton.vue';
import BaseCard from './components/BaseCard.vue';
export default {
  data(){
    return{
      active:false,
      sideBar:false
    }
  },
  components:{
    BaseCard,
    BaseButton,
  },
  created(){
    // setTimeout(()=>{
    //   this.active=true;
    // },2000)
     this.loadCategories();
  },
  methods:{
    myFunction() {
      this.sideBar=!this.sideBar;
    },
    closeModal(){
      this.active=false;
    },
    async loadCategories(){
         try{
            const response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=YPM2SmXttdC4PgRrpY1FjqB9Ud0fQVga`);
            const responseData= await response.json();
            this.$store.dispatch('books/loadCategories',responseData)
         }
         catch(error){
            console.log(error);
         }
      }
  }
}
</script>

<style scoped>
  html{
    overflow: hidden;
  }
  .modalPop{
    margin: 2rem;
  }
  h1{
    font-size: 1.5rem;
  }
  .button{
    display: block;
    background-color: #1a1927;
    color: white;
  }
  .button:hover{
    color: white;
  }
  .logo{
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
  .ridam{
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: rgba(216, 215, 215, 0.473);
    border: 0px solid #1a1927;
    border-radius: 25px;
    color: black;
    /* width: 80%; */
  }
  .d{
    color: black;
  }
  a{
    color: #1a1927;
  }
  .logoPic{
    background-color: grey;
    border: 0px solid;
    border-radius: 100px;
  }
  .BookBin{
    font-size: 3rem;
  }
  .parentSideNav{
    position: absolute;
    z-index: 1;
    box-shadow: 0px 10px 20px rgb(187, 187, 187);
    transition: ease-in;

  }
  .sideNav{
    background-color:rgba(255, 255, 255);
    height: 95vh;
    width: 250px;
  }
  .container {
  display: inline-block;
  cursor: pointer;
  transition: 0.5s;
}

.bar1, .bar2, .bar3 {
  width: 35px;
  height: 5px;
  background-color: #333;
  margin: 6px 0;
  transition: 0.4s;
}

.change .bar1 {
  -webkit-transform: rotate(-45deg) translate(-9px, 6px);
  transform: rotate(-45deg) translate(-9px, 6px);
}

.change .bar2 {opacity: 0;}

.change .bar3 {
  -webkit-transform: rotate(45deg) translate(-8px, -8px);
  transform: rotate(45deg) translate(-8px, -8px);
}
.hide{
  visibility: hidden;
  transition:150ms linear;
}
.visible{
  visibility: visible;
  transition:ease-in;
  transition-delay: 200ms;
}
 @media only screen and (max-width:1024px)
 {
  .BookBin{
    font-size: 2.0rem;
  }
  .parentSideNav{
    height: 80vh;
  }
 }
</style>
