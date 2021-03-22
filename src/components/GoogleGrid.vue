<template>
    <img style="width:130px; object-fit:fill; height:25vh" class="gridImage" :src="trend.image" alt="">
               <div class="titauth pt-2" >
                  <h1 class="has-text-weight-bold m-0 " style="width:130px; height:6.8vh;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;" >{{ trend.title }}</h1>
                  <h1 style='width:130px; height:7vh;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;'>{{ trend.author }}</h1>
               </div>
               <div class="is-flex is-justify-content-space-between is-align-items-center" style="width:100%">
                     <progress style="height:7px;width:70%" class="progress m-0" :value="trend.ratingprogress" max="5">{{trend.ratingprogress}}</progress>
                     <p>{{trend.ratingprogress*20}}%</p>
               </div>
</template>
<script>
export default {
    props:['trend']
}
</script>
<style scoped>
img{
   cursor: pointer;
}
h1{
   cursor: pointer;
}
.gridImage{
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 15px;
   }
   
</style>