<template>
<detail-modal :active="active" :selectedBook="selectedBook" @closeModal="closeModal"></detail-modal>
    <div class="columns  ml-6 is-hidden-touch">
  <div class="column py-3 px-1 has-text-centered" @click="catClicked(cat.name,0)" v-for="cat of categories" :key="cat.name">
    <div class="catCard card py-3" :class="{active:selectedCat===cat.name}">
    <img :src="cat.img" class="pt-3" alt="">
    <h1 class="is-uppercase has-text-weight-semibold is-size-6">{{cat.name}}</h1>
    </div >
  </div>
  
</div>
<div class="is-flex responsive mx-4 is-hidden-desktop">
  <div class=" py-3 px-1  has-text-centered" @click="catClicked(cat.name,0)" v-for="cat of categories" :key="cat.name">
    <div class="resCard card py-3" :class="{active:selectedCat===cat.name}">
    <img :src="cat.img" class="pt-3" alt="">
    <h1 class="is-uppercase has-text-weight-semibold is-size-6">{{cat.name}}</h1>
    </div >
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
    computed:{
        loadedBooks(){
         return this.$store.getters['books/getBooks'];
      },
      disableprev(){
            if(this.maxResult>this.starting){
                return true;
            }
            else{
                return false;
            }
        },
        disablenext(){
            if(this.maxResult>this.totalItems-this.starting){
                return true;
            }
            else{
                return false;
            }
        }
    },
    data(){
        return{
            selectedBook:{},
            active:false,
            selectedCat:'',
            categories:[
                {
                    name:'arts',
                    img:require('../assets/category/arts.jpg')
                },
                {
                    name:'biography',
                    img:require('../assets/category/biography.jpeg')
                },
                {
                    name:'comedy',
                    img:require('../assets/category/comedy.jpeg')
                },
                {
                    name:'action',
                    img:require('../assets/category/action.jpg')
                },
                {
                    name:'comic',
                    img:require('../assets/category/comic.jpeg')
                },
                {
                    name:'cooking',
                    img:require('../assets/category/cooking.jpeg')
                },
                {
                    name:'drama',
                    img:require('../assets/category/drama.jpeg')
                },
                {
                    name:'education',
                    img:require('../assets/category/education.jpeg')
                },
                {
                    name:'fantasy',
                    img:require('../assets/category/fantasy.jpeg')
                },
                {
                    name:'fiction',
                    img:require('../assets/category/fiction.jpeg')
                },
                {
                    name:'historical',
                    img:require('../assets/category/historical.jpeg')
                },
                {
                    name:'horror',
                    img:require('../assets/category/horror.jpeg')
                },
                {
                    name:'humour',
                    img:require('../assets/category/humour.jpeg')
                },
                {
                    name:'love',
                    img:require('../assets/category/love.jpeg')
                },
                {
                    name:'relegious',
                    img:require('../assets/category/relegious.jpeg')
                },
                {
                    name:'sports',
                    img:require('../assets/category/sports.jpeg')
                },
                {
                    name:'suspense',
                    img:require('../assets/category/suspense.jpeg')
                },
                {
                    name:'thriller',
                    img:require('../assets/category/thriller.jpeg')
                },
                {
                    name:'travel',
                    img:require('../assets/category/travel.jpeg')
                },


            ],
            pageOfItems:[],
            starting:0,
            maxResult:28,
            totalItems:null,
        }
    },
    methods:{
        catClicked(cat,index){
            this.starting=0;
            
            this.returnName(cat,index);

        },
        async returnName(selectedCategory,start){
            
            this.selectedCat=selectedCategory;
            try{
                const response= await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${selectedCategory}&startIndex=${start}&maxResults=${this.maxResult}`);
                const responseData=await response.json();
                this.$store.dispatch('books/loadBooks',responseData);
                this.totalItems=responseData.totalItems;
                
                }
            catch(error){
                console.log(error);

            }
                
        },
        openDetail(selected){
         this.active=true;
         this.selectedBook=selected;
        },
        closeModal(){
         this.active=false;
        },
        nextBook(){
            this.starting+=this.maxResult;
            this.returnName(this.selectedCat,this.starting);
        },
        prevBook(){
            this.starting-=this.maxResult;
            this.returnName(this.selectedCat,this.starting);
        }
        
    },
    created(){
            const random = Math.floor(Math.random()*19)
            this.returnName(this.categories[random].name,0)
       
    }
    
}
</script>

<style scoped>
    .catCard{
        width: 150px;
        height: 120px;
    }
    .resCard{
         width: 120px;
        height: 100px;
    }
    .columns{
        margin-top: 3%;
        overflow-x: auto;
        overflow-y: hidden;
        width: 75vw;
    }
    .responsive{
        margin-top: 3%;
        overflow-x: auto;
        overflow-y: hidden;
        width: 100vw;
    }
    .columns::-webkit-scrollbar{
        height: 10px;
    }
    .responsive::-webkit-scrollbar{
        height: 10px;
    }
    .grid-container {
       justify-items: center;
        display: inline-grid;
        width: 75vw;
        grid-template-columns: repeat(auto-fit, minmax(130px,1fr));
        grid-gap: 1rem;
        overflow-y: auto;
        overflow-x:hidden;
        height: 63vh;
        margin: 0.5rem 3rem;
   }
    .columns::-webkit-scrollbar-thumb{
      background-color: rgba(179, 179, 179, 0.479);
      border-radius: 20px;
      margin-left: 100px;
        margin-right: 10px;
   }
   .responsive::-webkit-scrollbar-thumb{
      background-color: rgba(179, 179, 179, 0.479);
      border-radius: 20px;
      margin-left: 100px;
        margin-right: 10px;
   }
   .card{
        border-radius: 12px;
        box-shadow: 0 0px 0px rgba(0, 0, 0, 0.26);
        padding: 1rem;
        margin: 0rem auto;
        max-width: 98%;
        background-color: rgba(216, 215, 215, 0.473);
   }
   .grid-container::-webkit-scrollbar{
   width: 5px;
} 

.active{
    box-shadow: 0 8px 20px rgba(117, 117, 117, 0.26);
    background-color: #fff;
}
.pagination{
    width: 75vw;
}

@media only screen and (max-width: 768px) {
  .grid-container{
      width: 100vw;
      margin: 0.5rem;
      height: 63vh;
  }
  .pagination{
      width: 95vw;
  }
}
@media (min-width: 768px) and (max-width: 1024px){
    .grid-container{
        height: 68vh;
    }
}
</style>