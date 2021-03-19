export default{
    saveBooks(state,payload){
        state.books=payload
    },
    saveCategories(state,payload){
        state.categories=payload;
    },
    saveSavedBooks(state,payload){
        state.savedBooks.push(payload);
    },
    saveNewyorkBooks(state,payload){
        state.newYorkBooks=payload;
    }
}