import React, { useState } from "react";
import axios from "axios";

import LoginSignUpButton from "./LoginSignUpButton";
import SideBySide from "../templates/SideBySide";
import Emphasize from "../animations/Emphasize";

export default function LoginSignUp(props){

    const [showAccountInf, setShowAccountInf] = useState(false)

    const myAccount=()=>{
        setShowAccountInf(!showAccountInf)
    }

    const logOut =()=>{
        props.universalProps.setUserLoggedIn(false)
        props.universalProps.setLoggedInUser({})
        axios.post("/api/sessionRemoveAuth")
    }

    const tableCols = {
        user_id: 'User ID',
        fname: 'First Name',
        mname: 'Middle Name',
        lname: 'Last Name',
        email: 'Email Address',
        dob: 'Date of Birth',
        password_: 'Password',
        ts: 'Last updated on',
        phone_number: 'Phone Number',
        gender: 'Gender'
    }

    const renderAccountInformation = 
    <div className="niceCenter" >
    <table className="table" style={{
        textAlign: 'left'
    }}>
        <tbody>
            <>
            {Object.keys(props.universalProps.loggedInUser).map(
                        (i)=>{
                            return(
                                <tr>
                                    <th>
                                        {tableCols[i]}
                                    </th>
                                    <td>
                                    {i !== 'dob' ? props.universalProps.loggedInUser[i] : props.universalProps.loggedInUser[i].slice(0, -15)}
                                    </td>
                                </tr>
                            )
                        }
                    )}
            </>
        </tbody>
    </table>
    <Emphasize
        content={
            <>
        <small>
            <i>Do not share this information with any one.</i>
        </small>
            </>
        }
    ></Emphasize>
    </div>
    

    return(
        <>
            { 
                !props.universalProps.userLoggedIn && <LoginSignUpButton
                    universalProps={props.universalProps}
                ></LoginSignUpButton>
            }
                <div>
                    {props.universalProps.userLoggedIn &&
                    <>
                    <SideBySide
                        left={<>
                            <button onClick={myAccount}
                                className='btn btn-primary'
                            >
                                My Account
                            </button>
                            <hr />
                            {
                                showAccountInf && 
                                <div className="niceCenter">
                                    {renderAccountInformation}
                                </div>
                            }
                        </>}
                        right={<>
                            <button className="btn btn-outline-danger"
                                onClick={logOut}
                                style={{
                                    textAlign:'right'
                                }}
                                >
                                    Instant Logout
                                </button>
                                {/* <div>
                                    <i>Logs out almost instantly.</i>
                                </div> */}
                        </>}
                    ></SideBySide>
                    </> }
                </div>
        </>
    )
}