<template>
    <newyork-detail :active="active" :selectedBook="selectedBook" @closeModal="closeModal"></newyork-detail>
   <div class="frame">
      <base-card style="height:100%" ></base-card>
   </div>
   <div class="newyorkCategory is-flex is-justify-content-space-between is-align-items-center px-6 py-2">
         <div>
            <h1 class="p-2 has-text-weight-bold discover">Discover Bestsellers</h1>
            <h1 class="px-2 has-text-weight-semibold bestSeller"  v-if="selectedRandomCategory">{{ selectedRandomCategory.list_name }}</h1>
         </div>
        
         <div class="view">
            <router-link to="/bestsellers">
                  <h1 class=" view has-text-weight-semibold pr-3 button">View All 
                     <img style="width:20%;"  src="../assets/right.png" alt=""></h1>
               
            </router-link>
         </div>
      </div>
   
      
      <div class="grid-container category">
            <div class="grid-item p-3  is-justify-content-space-between"  @click="openDetail(trend)" v-for="trend in trendingBooks" :key="trend.title">
               <grid-view :trend='trend'></grid-view>
               
            </div>
        
         
            
      </div>
   
   
</template>

<script>
import BaseCard from '../components/BaseCard.vue';
import NewyorkDetail from '../components/NewyorkDetail.vue';
export default {
   data(){
      return {
         active:false,
         selectedBook:{},
         categories:[],
         trendingBooks:[],
         selectedRandomCategory:{}
      }
   },
   components:{
      BaseCard,
      NewyorkDetail
   },
   computed:{
      
      loadedCategory(){
         return this.$store.getters['books/getCategories'];
      },
      randomNumber(){
         const random = Math.floor(Math.random()*59);
         return random;
         
      },
      
   },
   methods:{
      
      
      async randomBestSeller(){
         const res=await fetch('https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=YPM2SmXttdC4PgRrpY1FjqB9Ud0fQVga');
         const resdata=await res.json();
         this.categories=resdata;
         this.selectedRandomCategory=this.categories.results[this.randomNumber];
         const response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/current/${((this.selectedRandomCategory.list_name_encoded))}.json?api-key=YPM2SmXttdC4PgRrpY1FjqB9Ud0fQVga`);
         const responseData = await response.json();
         const books = responseData.results.books;
         for(const book of books){
            const temp={
            isGoogle:false,
            title:book.title,
            image:book.book_image,
            description:book.description,
            author:book.author,
            rate:book.rank,
            publisher:book.publisher,
            amazon:book.amazon_product_url
            };
            this.trendingBooks.push(temp);
            this.$store.dispatch('books/loadNewYorkBooks',this.trendingBooks)
            
         }
         
         
      },
      openDetail(selected){
            this.selectedBook=selected;
            this.active=true;
        },
        closeModal(){
            this.active=false
        }
   },
   created(){
      this.randomBestSeller();
   }
}
</script>

<style scoped>
  .frame{
     height: 28vh;
     width: 75vw;
     margin: 2rem 2rem 1rem 2rem;
  }
   .grid-container {
       justify-items: center;
  display: inline-grid;
  width: 75vw;
        grid-template-columns: repeat(auto-fit, minmax(140px,1fr));
        grid-gap: 1rem;
  overflow-y: auto;
   overflow-x:hidden;
   height: 50vh;
   margin-left: 3rem;
   }
.grid-container::-webkit-scrollbar{
   width: 5px;
}
.button{
   background-color: rgba(199, 199, 199, 0.473);
}
.newyorkCategory{
   width: 80vw;
}
.discover{
   font-size: 2rem;
}
.bestseller{
   font-size: 1.25rem;
}
.view{
   font-size: 1rem;
}
@media only screen and (max-width: 768px){
   .frame{
      width: 95vw;
      margin: 1rem 1rem .5rem 1.2rem;
      height: 20vh;
      text-align: center;
   }
   .discover{
   font-size: 1.5rem;
}
.bestseller{
   font-size: 1rem;
}
.view{
   font-size: .75rem;
}
.grid-container{
   width: 95vw;
   margin-left: 1.25rem;
   height: 60vh;
   grid-gap: 0rem;
}
.newyorkCategory{
   width: 100vw;
}
}
@media only screen and (max-width: 430px){
    .grid-container{
        height: 55vh;
    }
}
</style>