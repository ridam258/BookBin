<template>
    <teleport to='body'>
        <div >
            <div class="modal" :class="{'is-active':activeStatus}">
                <div class="modal-background" @click="closeModal"></div>
                <div class="modal-card newModal">
                    <base-card class="m-0 py-2">
                    <div>
                        <div>
                            
                        </div>
                        <div class="is-flex" style="max-height:35vh">
                            <img class="p-2 logo"  :src="bookClicked.image" >
                            <div class="px-4 py-3 right">
                                <div class="is-flex is-justify-content-space-between">
                                    <div class="titAuth">
                                        <h1 class="has-text-weight-bold title" style="max-width:70%">{{ bookClicked.title }}</h1>
                                        <h2 class="author has-text-weight-semibold has-text-warning">[{{ bookClicked.author}}]</h2>
                                    </div>
                                    <div>
                                        <h2 class="rank px-2">*{{ bookClicked.rate }}</h2>
                                    </div>
                                    
                                </div>
                                
                                <div class="my-4 is-flex">
                                <button  v-if="bookClicked.isSaved===false&&!pathIsSaved" class="button mx-3 p-3 has-text-weight-semibold is-danger" @click="saveClicked(bookClicked)">Save</button>
                                <router-link to="/saved"  v-else-if="bookClicked.isSaved&&!pathIsSaved"><button class="button mx-3 p-3 has-text-weight-semibold is-danger" >View</button></router-link>
                                <button   v-else-if="bookClicked.isSaved===true&&pathIsSaved" class="button mx-3 p-3 has-text-weight-semibold is-danger" @click="deleteClicked(bookClicked)">Delete</button>
                                <a :href="bookClicked.amazon"><button class="button mx-3 p-3 has-text-weight-semibold is-light">Buy</button></a>
                                
                                </div>
                            </div>
                            
                        </div>
                        <hr class="mt-2 mb-1">
                        <div class="description has-text-centered has-text-danger">
                            <h1 class="descHead has-text-weight-semibold ">Description</h1>
                            <hr>
                            <div class="is-flex is-justify-content-center is-align-items-center" style="width:100%;height:70%">
                                <p class="px-4 desc py-2">{{ bookClicked.description }}</p>
                            </div>
                        </div>
                        <hr class="m-0">
                        <div class="is-flex is-justify-content-space-around is-align-items-center py-4 px-2 has-text-centered">
                            <div style="max-width:34%">
                                <h1 class="has-text-weight-bold publisher">Publisher</h1>
                                <h2 class="has-text-danger has-text-weight-semibold pub">{{ bookClicked.publisher }}</h2>
                            </div>
                            <div>
                                
                                <a :href="bookClicked.amazon"><img class="amazon" src="../assets/amazon.png" alt=""></a>
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
            savedBook:{},
            pathIsSaved:false
        }
    },
    methods:{
        closeModal(){
            this.save=false;
            this.activeStatus=false;
            this.$emit('closeModal');
        },
        saveClicked(book){
            book.isSaved=true;
            this.savedBook=book;
            
        },
        deleteClicked(book){
            book.isSaved=false;
            const curSaved=JSON.parse( localStorage.getItem('saved'));
            console.log(curSaved);
            const index = curSaved.findIndex(x=>x.title===book.title);
            curSaved.splice(index,1);
            const newArr = JSON.stringify(curSaved);
            localStorage.setItem('saved',newArr);
            this.$emit('delete');
            this.activeStatus=false;
            this.$emit('closeModal');

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
    created(){
        console.log(this.$route.path);
        
        if(this.$route.path==='/saved'){
            this.pathIsSaved=true;
        }
    },
    emits:['closeModal','delete']
    
    
}
</script>

<style scoped>
.newModal{
    max-width: 99vw;
}
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
        font-size: 1rem;
    }
    .desc::-webkit-scrollbar{
        width: 5px;
    }
    .descHead{
        font-size: 1.5rem;
    }
    .rank{
        background-color: black;
        color: white;
        font-size: 1.5rem;
    }
    .logo{
        width: 30%;
    }
    .title{
        font-size: 1.5rem;
    }
    .author{
        font-size: 1.25rem;
    }
    .publisher{
        font-size:1.25rem;
    }
    .amazon{
        width: 40%;
    }

    @media only screen and (max-width:768px){
       .logo{
        width: 40%;
    }
    .title{
        font-size: 1rem;
    }
    .author{
        font-size: .75rem;
    }
    .publisher{
        font-size:.75rem;
    }
    .amazon{
        width: 30%;
    }
    .rank{
        font-size: 1rem;
    }
    .descHead{
        font-size: 1rem;
    } 
    .desc{
        font-size: .75rem;
        height: 14vh;
    }
    .button{
        font-size: .5rem;
    }
    .modal-card{
        width: 80vw;
    }
    .pub{
        font-size: .5rem;
    }
    .titAuth{
        height: 23vh;
        overflow-x: hidden;
        overflow-y: auto;
    }
    
    }
</style>