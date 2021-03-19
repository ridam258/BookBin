export default{
    listToString(array){
            let authors=''
            if(array){
                array.forEach(arr=>{
                    if(array.length>1){
                        authors+=arr+', ';
                    }
                    else{
                        authors=arr;
                    }
                })
                if(array.length>1){
                    authors=authors.substring(0,authors.length-2)
                }
            }
            else{
                authors='No Authors'
            }
        return authors;
        
    },
    bookPrice(salesPrice){
        if(salesPrice){
            return 'Rs.'+salesPrice;
        }
        else{
            return 'Not for sale';
        }
    },
    subTitle(sub){
        if(sub){
            return sub;
        }
        else{
            return 'No subtitle available'
        }
    },
    rating(rat){
        if(rat){
            return rat+'/5';
        }
        else{
            return '3/5';
        }
        
    },
    description(des){
        if(des){
            // if(des.length>500){
            //     return des.substring(0,400)+'.............'
            // }
            // else{
            //     return des;
            // }
            return des;
        }
        else{
            return 'No description available';
        }
    },
    publisher(pub){
        if(pub){
            return pub;
        }
        else{
            return 'Not available'
        }
    }
}