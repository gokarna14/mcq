import axios from "axios";


export const singleElementRequest =(api, key, needed)=>{
    axios.post(api, {key:key, needed:needed}).then(
        res=>{
            console.log(res.data);
        }
    ).catch(err=>{
        console.log(err);
    })
}