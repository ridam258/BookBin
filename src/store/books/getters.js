export default{
    getBooks(state){
        return state.books;
    },
    newGetBooks(state){
        return state.newYorkBooks;
    },
    getCategory(state){
        return state.categories;
    },
    getSavedBooks(state){
        return state.savedBooks;
    }
}