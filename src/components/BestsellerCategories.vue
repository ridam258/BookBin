<template>
    <div class="p-4">
        <h1 class="head px-3">New York Times</h1>
        <h1 class="head px-3 has-text-weight-semibold">Best Sellers</h1>
    </div>
    <hr class="m-0">
    <div style="overflow-x:hidden; overflow-y:auto;" class="new">
        <div class="pad"  v-for="cat in loadedCategory" :key="cat.name">
        <h1 class="has-text-black catName py-2"  @click="setRoute(cat.apiName)" style="display:block; text-decoration:underline">{{ cat.name }}</h1>
        <router-view v-if="selectedCategory===cat.apiName"></router-view>
        <div class="is-flex is-justify-content-space-between">
            <div class="has-text-danger catElse">
                <p>Published Between</p>
                <p>{{ cat.date }}</p>
            </div>
            <div class="has-text-danger catElse">
                <p>Updated {{ cat.update}}</p>
            </div>
        </div>
    </div>
    </div>
    
</template>

<script>
export default {
    data(){
        return{
            selectedCategory:''
        }
    },
    computed:{
        loadedCategory(){
            return this.$store.getters['books/getCategory'];
        },
        
    },
    methods:{
        setRoute(name){
            this.selectedCategory=name;
            this.$router.push(`/bestsellers/${name}`);
        }
    }
}
</script>

<style>
    .new::-webkit-scrollbar{
        width: 5px;
    }
    .head{
        font-size: 2rem;
    }
    .catName{
        font-size: 1.5rem;
    }
    .catElse{
        font-size: 1.25rem;
        padding: 2rem;
    }
    .pad{
        padding-right: 2rem;
        padding-left: 2rem;
    }
    .new{
        height: 82vh;
    }
    @media only screen and (max-width: 768px){
    .head{
        font-size: 1.5rem;
    }
    .catName{
        font-size: 1.25rem;
        
    }
    .catElse{
        font-size: 1rem;
    }
    .new{
        height: 65vh;
    }
    .pad{
        padding-right: 2rem;
        padding-left: 2rem;
    }
}
</style>
