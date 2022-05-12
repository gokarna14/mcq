import { wait } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

import { singleElementRequest } from "../../essentials/admin/adminEssentials";


const AdminLogin=()=>{

    const [loginInf, setLoginInf] = useState({})
    const [loading, setLoading] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)

    const handleInputChange=(name, input)=>{
        let temp = loginInf
        temp[name] = input
        setLoginInf(temp)
    }

    const handleLoginRequest=(e)=>{
        e.preventDefault()
        setLoading(true)
        axios.post('/api/requestLogin', loginInf).then(
            res=>{
                if(res.data > 0){
                    setLoggedIn(true)
                }
                else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Wrong Credentials !',
                        text: 'The information you provided does not match with any admin.',
                        footer: ''
                      })
                }
                setLoading(false)
            }
        ).catch(err=>{
            console.log(err)
        })
    }


    return(
        <>

            {loggedIn && 
            <>
                <h4>Welcome {}</h4>
                <button className="btn btn-dark"
                    onClick={()=>{setLoggedIn(false)}}
                >Log Out</button>
            </>}

            <div className="niceCenterExtreme" style={{
                textAlign: 'left'
            }}>
                {!loggedIn && <form className="niceCenter"
                    onSubmit={handleLoginRequest}
                >
                    <div className="form-group">
                        <label for="adminEmail">Email address</label>
                        <input type="email" className="form-control" id="adminEmail" aria-describedby="emailHelp" placeholder="Enter email" 
                            onChange={(e)=>{handleInputChange('email', e.target.value)}}
                        />
                        <label for="adminPhoneNumber">Phone Number</label>
                        <input required type="text" className="form-control" id="adminPhoneNumber" aria-describedby="phoneNumber" placeholder="Phone Number" 
                            onChange={(e)=>{handleInputChange('phone_number', e.target.value)}}
                        />
                        <label for="adminDOB">Date of birth</label>
                        <input required type="date" className="form-control" id="adminDOB" aria-describedby="DOB" placeholder="DOB" 
                            onChange={(e)=>{handleInputChange('dob', e.target.value)}}
                        />
                        
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input required type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" 
                            onChange={(e)=>{handleInputChange('password_', e.target.value)}}
                        />
                    </div>
                    <div className="">
                    <small id="emailHelp" className="form-text text-muted">We'll never share your information with anyone else.</small>
                        {/* <input type="checkbox" className="form-check-input" id="exampleCheck1" /> */}
                        {/* <label className="form-check-label" for="exampleCheck1">Check me out</label> */}
                        <hr />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit{loading && 
                        <>
                            <div className="spinner-border text-light" role="status">
                                <span className="sr-only"></span>
                            </div>
                        </>
                    }</button>
                    
                </form>}

            </div>
        </>
    )
}

export default AdminLogin;