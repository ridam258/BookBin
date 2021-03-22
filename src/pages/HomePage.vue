<template>
    <newyork-detail :active="active" :selectedBook="selectedBook" @closeModal="closeModal"></newyork-detail>
   <div class="frame">
      <div style="width:100%; height:100%">
         <div :class="{dis:index!==counter, hi:index===counter}"   v-for="(trend,index) in trendingBooks" :key="trend" >
            <div v-if="index===counter" @click="openDetail(trend)" style="height:100%; width:100% " class="p-4 is-flex is-justify-content-flex-start top">
               <img :src="trend.image" class="logo" alt="">
               <div class="titAuthHead" style="display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;">
               <h1 style=" display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;overflow: hidden;" class="titAuth">{{trend.title}}</h1>
               <h2 style=" display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;overflow: hidden;" class="Auth has-text-danger">{{trend.author}}</h2>
               <p style=" display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;" class="desc">{{trend.description.substring(0,200)}}</p>
               </div>
            </div>
         </div>
      </div>
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
   
      <div v-if="isLoading" style="height:55vh" class="is-flex is-justify-content-center is-align-items-center" >
         <dot-loader :loading="isLoading" :color="red" ></dot-loader>
      </div>
      <div v-else class="grid-container category">
            <div class="grid-item p-3  is-justify-content-space-between"  @click="openDetail(trend)" v-for="trend in trendingBooks" :key="trend.title">
               <grid-view :trend='trend'></grid-view>
               
            </div>
        
         
            
      </div>
   
   
</template>

<script>
import NewyorkDetail from '../components/NewyorkDetail.vue';
export default {
   data(){
      return {
         red:'#707070',
         isLoading:false,
         active:false,
         selectedBook:{},
         categories:[],
         trendingBooks:[],
         selectedRandomCategory:{},
         counter:0
      }
   },
   components:{
      NewyorkDetail,
   },
   computed:{
      loadedCategory(){
         console.log(this.$store.getters['books/getCategories']);
         
         return this.$store.getters['books/getCategories'];
      },
      randomNumber(){
         const random = Math.floor(Math.random()*59);
         return random;
         
      },
      
   },
   methods:{
      async randomBestSeller(){
         this.isLoading=true;
         const res=await fetch('https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=YPM2SmXttdC4PgRrpY1FjqB9Ud0fQVga');
         const resdata=await res.json();
         this.categories=resdata;
         this.selectedRandomCategory=this.categories.results[this.randomNumber];
         const response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/current/${((this.selectedRandomCategory.list_name_encoded))}.json?api-key=YPM2SmXttdC4PgRrpY1FjqB9Ud0fQVga`);
         const responseData = await response.json();
         const books = responseData.results.books;
         for(const book of books){
            const temp={
            isSaved:false,
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
            this.isLoading=false;
         }
         
         
      },
      openDetail(selected){
            this.selectedBook=selected;
            this.active=true;
        },
        closeModal(){
            this.active=false
        },
        
   },
   created(){
      this.randomBestSeller();
   },
   mounted(){
      this.$nextTick(()=>{
         window.setInterval(()=>{
            if(this.counter<this.trendingBooks.length-1){
               this.counter++;
            }
            else if(this.counter==this.trendingBooks.length-1){
               this.counter=0;
            }
         },6000)
      })
   }
}
</script>

<style scoped>

  .frame{
     margin-left: 17%;
     margin-top: 2rem;
     height: 28vh;
     width: 55vw;
     /* margin: 2rem 2rem 1rem 2rem; */
     background-color: rgba(218, 216, 216, 0.473);
     border: 0px;
     border-radius: 100px;
        box-shadow: 0 5px 10px rgba(131, 131, 131, 0.26);
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
.logo{
   width:130px;
   margin-left: 10%;
}
.titAuth{
   font-size: 1.25rem;
   font-weight: bold;
   height: 5vh;
   
}
.Auth{
   font-size: 1.1rem;
   height: 5vh;
   
}
.titAuthHead{
   padding: .5rem 2rem;
}
.dis{
   display: none;
   height: 0px;
   width: 0px;
}
.hi{
   width: 100%;
   height:100%
}
.desc{
   height: 7vh;
}
.top{
   cursor: pointer;
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
   margin-left: 1.55rem;
   height: 60vh;
   grid-gap: 0rem;
}
.newyorkCategory{
   width: 100vw;
}
.logo{
   width:100px;

}
.titAuth{
   font-size: 1rem;
   font-weight: bold;
   
}
.Auth{
   font-size: 1rem;
   
}
.desc{
   font-size: 1rem;
}
.titAuthHead{
   padding:1rem;
}

}
@media only screen and (max-width: 430px){
    .grid-container{
        height: 55vh;
    }
    .logo{
       width:75px
    }
    .titAuth{
   font-size: 1rem;
   font-weight: 600;
   height: 3vh;
   
}
.Auth{
   font-size: 1rem;
   height: 3vh;
}
.desc{
   font-size: .8rem;
   display: none;
   height: 5.5vh;
}
.titAuthHead{
   padding: .5rem;
}

}
</style>