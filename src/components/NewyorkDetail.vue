<template>
    <teleport to='body'>
        <div>
            <div class="modal" :class="{'is-active':activeStatus}">
                <div class="modal-background" @click="closeModal"></div>
                <div class="modal-card">
                    <base-card>
                    <div>
                        <div class="is-flex" style="max-height:35vh">
                            <img class="p-2" style="width:30%" :src="bookClicked.image" >
                            <div class="px-4 py-3 right">
                                <div class="is-flex is-justify-content-space-between">
                                    <div>
                                        <h1 class="has-text-weight-bold is-size-4" style="max-width:70%">{{ bookClicked.title }}</h1>
                                        <h2 class="is-size-5 has-text-weight-semibold has-text-warning">[{{ bookClicked.author}}]</h2>
                                    </div>
                                    <div>
                                        <h2 class="rank is-size-4 px-2">*{{ bookClicked.rate }}</h2>
                                    </div>
                                    
                                </div>
                                
                                <div class="my-4">
                                <button  v-if="save===false" class="button mx-3 p-3 has-text-weight-semibold is-danger" @click="saveClicked(bookClicked)">Save</button>
                                <router-link to="/saved"  v-else><button class="button mx-3 p-3 has-text-weight-semibold is-danger" >View</button></router-link>
                                <a :href="bookClicked.amazon"><button class="button mx-3 p-3 has-text-weight-semibold is-light">Buy</button></a>
                                
                                </div>
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
                                
                                <a :href="bookClicked.amazon"><img style="width:40%" src="../assets/amazon.png" alt=""></a>
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
            this.save=false;
            this.activeStatus=false;
            this.$emit('closeModal');
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
    .rank{
        background-color: black;
        color: white;
    }

</style>