import Api from "../Axios/Api";
const CATEGORIE_API="/categories"
    const fetchCategories=async()=> {
    return await Api.get(CATEGORIE_API);
    }
    const fetchCategorieById=async(id)=> {
    return await Api.get(CATEGORIE_API + '/' + id);
    }
    const deleteCategorie=async(id)=>{
        return await Api.delete(CATEGORIE_API+"/"+id);
    }
    const addCategorie=async(cat)=> { 
    return await Api.post(CATEGORIE_API, cat);
    } 
    const editCategorie=async(cat) =>{ 
    return await Api.put(CATEGORIE_API + '/' + cat._id, cat);
    }

    export const CategorieService = {
        fetchCategories,
        fetchCategorieById,
        deleteCategorie,
        addCategorie,
        editCategorie,
        }