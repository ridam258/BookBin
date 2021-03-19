import util from '../../utils.js';
export default{
    loadBooks(context,payload){
        const items=payload.items;
        const books=[];
        for(const item of items){
            const book={
                isGoogle:true,
                id: item.id,
                image:item.volumeInfo.imageLinks==null?'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAG2u-VKWeP2hnQpMpORlAIVMxnlL01utRiw&usqp=CAU':item.volumeInfo.imageLinks.thumbnail,
                title:item.volumeInfo.title,
                author: util.listToString(item.volumeInfo.authors),
                category:util.listToString(item.volumeInfo.categories),
                rate:util.bookPrice(item.saleInfo.listPrice?.amount),
                subtitle:util.subTitle(item.volumeInfo.subtitle),
                rating:util.rating(item.volumeInfo.averageRating),
                description: util.description(item.volumeInfo.description),
                publisher: util.publisher(item.volumeInfo.publisher),
                noOfPages:item.volumeInfo.pageCount,
                Published:item.volumeInfo.publishedDate,
                ratingprogress:item.volumeInfo.averageRating==null?3:item.volumeInfo.averageRating,
                link:item.volumeInfo.infoLink
            };
            books.push(book);
        }
        context.commit('saveBooks', books);
    },

    loadCategories(context,payload){
        const result = payload.results;
        const categories=[];
        for (const item of result){
            const category={
                name:item.display_name,
                update:item.updated,
                date:item.oldest_published_date.substring(0,4)+'-'+item.newest_published_date.substring(0,4),
                apiName:item.list_name_encoded,
            }
            categories.push(category);
        }
        context.commit('saveCategories',categories);
    },
    loadSavedBooks(context,payload){
        const books=[];
        const book={
                isGoogle:payload.isGoogle,
                id: payload.id,
                image:payload.image,
                title:payload.title,
                author: payload.author,
                category:payload.category,
                rate:payload.rate,
                subtitle:payload.subtitle,
                rating:payload.rating,
                description:payload.description,
                publisher:payload.publisher,
                noOfPages:payload.noOfPages,
                Published:payload.Published,
                ratingprogress:payload.ratingprogress,
                link:payload.link
        };
        books.push(book);
        context.commit('saveSavedBooks',book);
    },
    loadNewYorkBooks(context,payload){
        context.commit('saveNewyorkBooks',payload);
    }
}