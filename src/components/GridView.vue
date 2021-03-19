<template>
    <img style="width:85%; object-fit:cover; height:25vh" class="gridImage" :src="trend.image" alt="">
               <div class="titauth pt-2" >
                  <h1 class="has-text-weight-bold m-0 " style="height:7vh;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;" >{{ trend.title }}</h1>
                  <h1 style='height:7vh;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;'>{{ trend.author }}</h1>
               </div>
               <h1 class="rank">#{{trend.rate}}</h1>
</template>
<script>
export default {
    props:['trend']
}
</script>
<style scoped>
.gridImage{
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 15px;
   }
   .rank{
   background-color:#1a1927;
   position: relative;
   width: 20%;
   text-align: center;
   bottom: 92%;
   left:60%;
   color: white;
}
</style>