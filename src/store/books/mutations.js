export default{
    saveBooks(state,payload){
        state.books=payload
    },
    saveCategories(state,payload){
        state.categories=payload;
    },
    saveSavedBooks(state,payload){
        state.savedBooks.push(payload);
        const newArr=JSON.stringify(state.savedBooks)
        localStorage.setItem('saved',newArr);
    },
    saveNewyorkBooks(state,payload){
        state.newYorkBooks=payload;
    }
}