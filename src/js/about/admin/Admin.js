import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";

import AdminLogin from "./AdminLogin";


const Admin=()=>{

    const clicked=()=>{
        axios.post('../api/getUserIP').then(res=>{
            console.log(res.data)
        }).catch(err=>{
            console.log(err)
        })


        // const cookies = new Cookies();
        // cookies.set('myCat', 'Pacman', { path: '/about/admin' });
        // console.log(cookies.get('myCatz'));
    }



    return(
        <>
        <br /><hr />
            {
                <AdminLogin></AdminLogin>
            }
            {/* <button
                onClick={clicked}
                >
                Click Me
            </button> */}
        </>
    )
}

export default Admin;