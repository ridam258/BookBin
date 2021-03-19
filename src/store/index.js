import { createStore } from 'vuex'
import booksModule from './books/index.js'
export default createStore({
  modules:{
      books:booksModule,
  },
  state: {
  },
  mutations: {
  },
  actions: {
  }
})
