import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import BestsellerCategories from '../components/BestsellerCategories.vue';
import BestsellerBooks from '../components/BestsellerBooks.vue';
import SearchBook from '../components/SearchBook.vue';
import SavedBook from '../components/SavedBook.vue';
import BookCategories from '../components/BookCategory.vue';
import TheAbout from '../components/TheAbout.vue';
const router = createRouter({
  history: createWebHistory(),
  routes:[
      {path:'/', redirect:'/home'},
      {path:'/home', component:HomePage},
      {path:'/bestsellers', component:BestsellerCategories, children:[
        {path:':bookId', component:BestsellerBooks,props:true}
      ]},
      {path:'/search',component:SearchBook},
      {path:'/saved',component:SavedBook},
      {path:'/categories',component:BookCategories},
      {path:'/about', component:TheAbout}
  ]
});

export default router
