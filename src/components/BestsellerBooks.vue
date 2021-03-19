<template>
    <newyork-detail :active="active" :selectedBook="selectedBook" @closeModal="closeModal"></newyork-detail>
    <div class="grid-container mx-6 category">         
            <div class="grid-item p-5  is-justify-content-space-between" @click="openDetail(trend)"  v-for="trend in books" :key="trend.title">
               <grid-view :trend='trend'></grid-view>
               
            </div>
      </div>
</template>

<script>
import GridView from './GridView.vue';
import NewyorkDetail from './NewyorkDetail.vue';
export default {
    data(){
        return{
            active:false,
            books:[],
            selectedBook:{}
        }
    },
    components: { GridView,
    NewyorkDetail },
    props:['bookId'],
    methods:{
        async loadBooks(){
            const response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/current/${this.bookId}.json?api-key=YPM2SmXttdC4PgRrpY1FjqB9Ud0fQVga`);
            const responseData = await response.json();
            const temp=responseData.results.books;
            for(const t of temp){
                const x={
                    isGoogle:false,
                    title:t.title,
                    image:t.book_image,
                    description:t.description,
                    author:t.author,
                    rate:t.rank,
                    publisher:t.publisher,
                    amazon:t.amazon_product_url
                }
                this.books.push(x);
                this.$store.dispatch('books/loadNewYorkBooks',this.books);
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
        this.loadBooks();
        
    }
    
}
</script>

<style scoped>
.grid-container {
       justify-items: center;
  display: inline-grid;
  grid-template-columns: repeat(6,1fr);
  overflow-y: auto;
   overflow-x:hidden;
   height: 50vh;
   }
   .grid-container::-webkit-scrollbar{
   width: 5px;
}
</style>