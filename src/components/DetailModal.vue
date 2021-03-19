<template>
    <teleport to='body'>
        <div>
            <div class="modal" :class="{'is-active':activeStatus}">
                <div class="modal-background" @click="closeModal"></div>
                <div class="modal-card">
                    <base-card>
                    <div>
                        <div class="is-flex" style="max-height:35vh">
                            <img class="p-2" :src="bookClicked.image" >
                            <div class="px-4 py-3 right">
                                <h1 class="has-text-weight-bold is-size-4">{{ bookClicked.title }}</h1>
                                <h2 class="is-size-5 has-text-weight-semibold has-text-warning">[{{ bookClicked.author}}]</h2>
                                <hr class="m-1">
                                <h4 class="is-size-6">{{ bookClicked.subtitle}}</h4>
                                <hr class="m-1">
                                <div >
                                <h1 class="is-size-6">Rating: {{bookClicked.rating}}</h1>
                                
                                </div>
                            </div>
                            
                        </div>
                        <div class="is-flex is-justify-content-space-between">
                             <div >
                        <h2 class="is-size-5 px-2">{{ bookClicked.category }}</h2>
                        <h2 class="is-size-6 px-2">{{ bookClicked.rate }}</h2>
                        </div>
                        <div>
                                <button  v-if="save===false" class="button mx-3 p-3 has-text-weight-semibold is-danger" @click="saveClicked(bookClicked)">Save</button>
                                <router-link to="/saved"  v-else><button class="button mx-3 p-3 has-text-weight-semibold is-danger" >View</button></router-link>
                                <a :href="bookClicked.link"><button class="button mx-3 p-3 has-text-weight-semibold is-light">Open</button></a>
                                </div>
                        </div>
                       
                        <hr>
                        <div class="description has-text-centered has-text-danger">
                            <h1 class="is-size-4 has-text-weight-semibold ">Description</h1>
                            <hr>
                            <div class="is-flex is-justify-content-center is-align-items-center" style="width:100%;height:70%">
                                <p class="is-size-6 px-4 desc py-2">{{ bookClicked.description }}</p>
                            </div>
                        </div>
                        <hr>
                        <div class="is-flex is-justify-content-space-around py-4 px-2 has-text-centered">
                            <div style="max-width:34%">
                                <h1 class="has-text-weight-bold is-size-5">Publisher</h1>
                                <h2 class="has-text-danger has-text-weight-semibold">{{ bookClicked.publisher }}</h2>
                            </div>
                            <div>
                                <h1 class="has-text-weight-bold is-size-5">No. of Pages</h1>
                                <h2 class="has-text-danger has-text-weight-semibold">{{ bookClicked.noOfPages }}</h2>
                            </div>
                            <div>
                                <h1 class="has-text-weight-bold is-size-5">Published</h1>
                                <h2 class="has-text-danger has-text-weight-semibold">{{ bookClicked.Published }}</h2>
                            </div>
                        </div>
                    </div>
                    </base-card>
                </div>
            </div>
        </div>
    </teleport>
</template>


<script>
import BaseCard from './BaseCard.vue';
export default {
  components: { BaseCard },
    props:['active','selectedBook'],
    data(){
        return{
            activeStatus:false,
            bookClicked:{},
            bookDesc:'',
            save:false,
            savedBook:{}
        }
    },
    methods:{
        closeModal(){
            this.activeStatus=false;
            this.$emit('closeModal');
            this.save=false;
        },
        saveClicked(book){
            this.save=true;
            this.savedBook=book;
            
        }
},
    watch:{
        active(value){
            this.activeStatus=value
        },
        selectedBook(value){
            this.bookClicked=value;
        },
        savedBook(value){
            this.$store.dispatch('books/loadSavedBooks',value);
        }
    },
    emits:['closeModal']
    
    
}
</script>

<style scoped>
html{
    overflow-y: auto;
}
    hr{
        margin: 1rem auto;
    }
    
    .right{
        width: 100%;
    }
    .desc{
        overflow-x: hidden;
        overflow-y: auto;
        height: 18vh;
    }
    .desc::-webkit-scrollbar{
        width: 5px;
    }
</style>