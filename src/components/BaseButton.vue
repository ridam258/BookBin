<template>
    <router-link v-if="title!=='About'" active-class="ridam" :to="navTo" style="text-decoration:none"><div class="is-flex  is-align-items-center px-4 " style="width:100%; text-decoration:none">
      <img style="width:15%; height:10%" :src="getImgUrl(imgSrc)" alt="">
      <h1  class="my-2 px-2 has-text-weight-semibold is-size-5 c">{{title}}</h1>
      </div></router-link>
      <button v-else active-class="ridam" class="but" :to="navTo" style="text-decoration:none"><div class="is-flex  is-align-items-center px-4 but " style="width:100%; text-decoration:none">
      <img style="width:15%; height:10%" :src="getImgUrl(imgSrc)" alt="">
      <h1  class="my-2 px-2 has-text-weight-semibold is-size-5 c">{{title}}</h1>
      </div></button>
</template>
 
<script>
export default {
    methods:{
        getImgUrl(pet) {
        var images = require.context('../assets/', false, /\.png$/)
        return images('./' + pet + ".png")
  }
    },
    props:{
      title:{
        type:String,
        required:true
      },
      imgSrc:{
        type:String,
        required:true
      },
      navTo:{
        type:String,
        required:false
      }
    }
}
</script>

<style scoped>
  .but{
    border: 0px;
    border-radius: 100px;
    background-color: #fff;
  }
</style>
