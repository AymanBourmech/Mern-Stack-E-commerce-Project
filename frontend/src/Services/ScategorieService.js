import Api from "../Axios/Api";
const SCATEGORIE_API="/scategories"
    const fetchScategories=async()=> {
    return await Api.get(SCATEGORIE_API);
    }
    const fetchScategorieById=async(id)=> {
    return await Api.get(SCATEGORIE_API + '/' + id);
    }
    const deleteScategorie=async(id)=>{
        return await Api.delete(SCATEGORIE_API+"/"+id);
    }
    const addScategorie=async(scat)=> { 
    return await Api.post(SCATEGORIE_API, scat);
    } 
    const editScategorie=async(scat) =>{ 
    return await Api.put(SCATEGORIE_API + '/' + scat._id, scat);
    }

    const fetchScatByCat=async(id)=> {
    return await Api.get(SCATEGORIE_API + '/cat/' + id);
    }

    export const ScategorieService = {
        fetchScategories,
        fetchScategorieById,
        deleteScategorie,
        addScategorie,
        editScategorie,
        fetchScatByCat
        }