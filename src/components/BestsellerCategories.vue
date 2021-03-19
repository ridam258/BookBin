<template>
    <div class="p-4">
        <h1 class="is-size-3 px-3">New York Times</h1>
        <h1 class="is-size-3 px-3 has-text-weight-semibold">Best Sellers</h1>
    </div>
    <hr class="m-0">
    <div style="overflow-x:hidden; overflow-y:auto; height:82vh" class="new">
        <div class="p-5"  v-for="cat in loadedCategory" :key="cat.name">
        <h1 class="has-text-black is-size-4 py-2"  @click="setRoute(cat.apiName)" style="display:block; text-decoration:underline">{{ cat.name }}</h1>
        <router-view v-if="selectedCategory===cat.apiName"></router-view>
        <div class="is-flex is-justify-content-space-between">
            <div class="has-text-danger is-size-5">
                <p>Published Between</p>
                <p>{{ cat.date }}</p>
            </div>
            <div class="has-text-danger is-size-5">
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
</style>
