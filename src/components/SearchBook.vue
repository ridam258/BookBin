<template>
<detail-modal :active="active" :selectedBook="selectedBook" @closeModal="closeModal"></detail-modal>
    <div class="searchHead">
        <h1 class="mr-6 discover">Discover Book</h1>
        <h1 class="ml-6 discover">Discover Magic</h1>
        <div class="field has-addons is-justify-content-center pb-2">
  <div class="control">
    
    <input class="input" type="text" placeholder="Find a book" v-model="inputSearched">
  </div>
  <div class="control" @click="searched">
    <a class="button is-light" style="border:1px solid grey">
      <img style="width:15%" class="mr-3" src="../assets/search.png" alt="">
      <h3 class="has-text-weight-semibold">Search</h3>
    </a>
    
  </div>
  
    </div>
    <div class="is-flex is-justify-content-center is-align-items-center">
      <h1 class="has-text-weight-semibold size5">Search By:</h1>
      <div class="control">
  <label class="radio has-text-weight-semibold  size5">
    <input type="radio" checked value="title" v-model="selected" name="answer">
    Title
  </label>
  <label class="radio has-text-weight-semibold  size5">
    <input type="radio" name="answer" value="author" v-model="selected">
    Author
  </label>
</div>
</div>
    </div>
    <div class="grid-container  category">
    
         <div  class="grid-item my-2 ml-5 mr-3" v-for="book in loadedBooks" :key="book.id" @click="openDetail(book)">
            <google-grid :trend='book'></google-grid>
         </div>      
    </div>
    <div class="is-flex is-justify-content-space-between pagination mx-5">
        <button class="button is-light m-2 pl-3 has-text-weight-semibold" :disabled='disableprev'  @click="prevBook" ><img style="width:20%" src="../assets/left.png" alt="">Previous</button>
        <button class="button is-light m-2 pl-3 has-text-weight-semibold" :disabled='disablenext' @click="nextBook" >Next<img style="width:30%" src="../assets/right.png" alt=""></button>
    </div>
</template>
<script>
import DetailModal from './DetailModal.vue';
export default {
  components: { DetailModal },
  data(){
    return{
            active:false,
      selected:'title',
      start:0,
      maxResult:35,
      totalItems:null,
      key:true,
      inputSearched:'',
      selectedBook:{},
    }
  },
  computed:{
        loadedBooks(){
         return this.$store.getters['books/getBooks'];
      },
       disableprev(){
            if(this.maxResult>this.start){
                return true;
            }
            else{
                return false;
            }
        },
        disablenext(){
            if(this.maxResult>this.totalItems-this.start){
                return true;
            }
            else{
                return false;
            }
        }
  },
  methods:{
    async searchTitle(title,startingIndex){
            
            if(this.key===true){
              try{
                const response= await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&startIndex=${startingIndex}&maxResults=${this.maxResult}`);
                const responseData=await response.json();
                this.totalItems=responseData.totalItems;
                console.log(this.totalItems);
                this.$store.dispatch('books/loadBooks',responseData);
                }
            catch(error){
                console.log(error);
            }
            }
            else{
              try{
                const response= await fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${title}&startIndex=${startingIndex}&maxResults=${this.maxResult}`);
                const responseData=await response.json();
                this.totalItems=responseData.totalItems;
                console.log(this.totalItems);
                this.$store.dispatch('books/loadBooks',responseData);
                }
            catch(error){
                console.log(error);
            }
            }
        },
        nextBook(){
            this.start+=this.maxResult;
            this.searchTitle("science",this.start);
        },
        prevBook(){
            this.start-=this.maxResult;
            this.searchTitle("science",this.start);
        },
        searched(){
          if(this.inputSearched){
          this.searchTitle(this.inputSearched,0);
          this.inputSearched=''
          }
        },
        openDetail(selected){
         this.active=true;
         this.selectedBook=selected;
        },
        closeModal(){
         this.active=false;
        },
  },
  watch:{
    selected(value){
      this.start=0;
      if(value==="title"){
          this.key=true;
      }
      else{
        this.key=false;
      }
    }
  },
  created(){
    this.searchTitle('',0);
    
  }
}
</script>
<style scoped>
  .searchHead{
    padding: 0.75rem 2rem;
    text-align: center;
  }
  .discover{
    font-weight: bold;
    font-size: 1.5rem;
  }
  .field{
    padding: 2rem;
  }
  .input{
    border-radius: 50px;
    width: 30vw;
  }
  .button{
    border-radius: 50px;
  }
  .size5{
    font-size: 1.25rem;
    padding: 0rem .75rem;
  }
  .grid-container {
       justify-items: center;
        display: inline-grid;
        width: 75vw;
        grid-template-columns: repeat(auto-fit, minmax(130px,1fr));
        grid-gap: 1rem;
        overflow-y: auto;
        overflow-x:hidden;
        height: 60vh;
        margin: 0.5rem 3rem;
   }
   .grid-container::-webkit-scrollbar{
   width: 5px;
}
.pagination{
    width: 75vw;
}
  @media only screen and (max-width:768px){
    .input{
      width: 50vw;
    }
    .size5{
      font-size: 1rem;
      padding: 0rem .25rem;
    }
     .grid-container{
      width: 100vw;
      margin: 0.5rem;
      height: 50vh;
  }
  .pagination{
      width: 95vw;
  }
  }
  @media (min-width: 768px) and (max-width: 1024px){
    .grid-container{
        height: 60vh;
    }
}
</style>