<template>
<detail-modal  :active="activeGoogle" :selectedBook="selectedBook" @closeModal="closeModal"></detail-modal>
<newyork-detail :active="activeNew" :selectedBook="selectedBook" @closeModal="closeModal"></newyork-detail>
<div class="card-Container my-4">
    <div v-for="book of savedBooks" :key="book.title" class="mt-6" >
        
        <div class="card is-flex mx-6 mb-4" @click="openDetail(book)">
            <img :src="book.image"  class="bookImg p-2" alt="">
            <div>
            <h1 class=" title has-text-weight-bold m-3">{{ book.title }}</h1>
            <h1 class=" author has-text-semibold has-text-danger m-3">{{ book.author }}</h1>
            </div>
        </div>
    </div>
</div>
    
</template>

<script>
import DetailModal from './DetailModal.vue';
import NewyorkDetail from './NewyorkDetail.vue';
export default {
    data(){
        return{
            selectedBook:{},
            activeGoogle:false,
            activeNew:false,
        }
    },
    components:{
        DetailModal,
        NewyorkDetail
    },
    computed:{
        savedBooks(){
            return this.$store.getters['books/getSavedBooks'];
        },
        
    },
    methods:{
        openDetail(selected){        
        if(selected.isGoogle){
            this.activeGoogle=true;
        }
        else if(!selected.isGoogle){
            this.activeNew=true;
        }
         this.selectedBook=selected;
         this.activecomp();
        },
        closeModal(){
         this.activeGoogle=false;
         this.activeNew=false;
        },
        activecomp(){
            if(this.selectedBook.isGoogle){
                this.google=this.selectedBook.isGoogle;
            }
            else{

               this.google = this.selectedBook.isGoogle;
            }
        }
    }


}
</script>

<style scoped>
.card{
        border-radius: 12px;
        box-shadow: 0 10px 20px rgba(255, 255, 255, 0.63);
        padding: 1rem;
        max-width: 98%;
        background-color: rgba(216, 215, 215, 0.473);
   }
   .card-Container{
       overflow-x: hidden;
       overflow-y: auto;
       height: 97vh;
   }
   .bookImg{
       max-width: 10%;
   }
   .title{
       font-size: 1.5rem;
   }
   .author{
       font-size: 1.25rem;
   }
   @media only screen and (max-width: 768px) {
       .bookImg{
       max-width: 20%;
   }
   .title{
       font-size: 1.25rem;
   }
   .author{
       font-size: .75rem;
   }
   @media only screen and (max-width: 430px){
       .title{
           font-size: 1rem;
       }
       .bookImg{
           max-width: 40%;
       }
   }
   }
</style>