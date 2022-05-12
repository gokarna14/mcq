import React from "react";
import axios from "axios";


const Admin=()=>{

    const clicked=()=>{
        axios.post('../api/getUserIP').then(res=>{
            console.log(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }



    return(
        <>
        <br /><hr />
            <form>
                <button className="btn btn-primary" type="submit">
                    Go to admin interface
                </button>
            </form>
            <button
                onClick={clicked}
                >
                Click Me
            </button>
        </>
    )
}

export default Admin;