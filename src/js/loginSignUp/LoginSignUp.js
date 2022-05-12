import React, { useState } from "react";

export default function LoginSignUp(props){

    const [haveAccount, setHaveAccount] = useState(true)
    const [loading, setLoading] = useState(false)


    const handleLoginRequest=(e)=>{
        e.preventDefault();
        console.log((haveAccount ? "LogIn request" : "Sign Up request"));
        console.log(props.universalProps.userInf);
    }

    const loginForm = (<>
            <div className="niceCenterExtreme">
                <form className="niceCenterExtreme"
                        onSubmit={handleLoginRequest}
                    >
                    <h5>Please Login using valid credentials</h5>
                    <hr />
                        <div className="form-group">
                            <label for="userEmail">Email address</label>
                            <input type="email" className="form-control" id="userEmail" aria-describedby="emailHelp" placeholder="Enter email" 
                                onChange={(e)=>{props.universalProps.handleInputChange('email', e.target.value)}}
                            />
                            <label for="userPhoneNumber">Phone Number</label>
                            <input required type="text" className="form-control" id="userPhoneNumber" aria-describedby="phoneNumber" placeholder="Phone Number" 
                                onChange={(e)=>{props.universalProps.handleInputChange('phone_number', e.target.value)}}
                            />
                            
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input required type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" 
                                onChange={(e)=>{props.universalProps.handleInputChange('password_', e.target.value)}}
                            />
                        </div>
                        <div className="">
                        <small id="emailHelp" className="form-text text-muted">We'll never share your information with anyone else.</small>
                            {/* <input type="checkbox" className="form-check-input" id="exampleCheck1" /> */}
                            {/* <label className="form-check-label" for="exampleCheck1">Check me out</label> */}
                            <hr />
                        </div>
                        <button type="submit" className="btn btn-primary">Login{loading && 
                            <>
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only"></span>
                                </div>
                            </>
                        }</button>
                </form>
            </div>
                    
    </>)


    const signUpFrom =(<>
             <div className="niceCenterExtreme">
                <form className="niceCenterExtreme"
                        onSubmit={handleLoginRequest}
                    >
                    <h5>Please Sign up providing valid Information</h5>
                    <hr />
                    
                        <div className="form-group">
                            <label for="userDob">First Name</label>
                                <input required type="text" className="form-control" id="userFname" aria-describedby="userFname" placeholder="First Name" 
                                onChange={(e)=>{props.universalProps.handleInputChange('fname', e.target.value)}}
                            />
                            <label for="userDob">Middle Name</label>
                                <input type="text" className="form-control" id="userMname" aria-describedby="userMname" placeholder="Middle Name" 
                                onChange={(e)=>{props.universalProps.handleInputChange('mname', e.target.value)}}
                            />
                            <label for="userDob">Last Name</label>
                                <input required type="text" className="form-control" id="userLname" aria-describedby="userLname" placeholder="Last Name" 
                                onChange={(e)=>{props.universalProps.handleInputChange('lname', e.target.value)}}
                            />

                             <label for="userDob">Date of birth</label>
                            <input required type="date" className="form-control" id="userDob" aria-describedby="dob" placeholder="Date of birth" 
                            onChange={(e)=>{props.universalProps.handleInputChange('dob', e.target.value)}}
                            />
                            <label for="userEmail">Email address</label>
                            <input type="email" className="form-control" id="userEmail" aria-describedby="emailHelp" placeholder="Enter email" 
                                onChange={(e)=>{props.universalProps.handleInputChange('email', e.target.value)}}
                            />
                            <label for="userPhoneNumber">Phone Number</label>
                            <input required type="text" className="form-control" id="userPhoneNumber" aria-describedby="phoneNumber" placeholder="Phone Number" 
                                onChange={(e)=>{props.universalProps.handleInputChange('phone_number', e.target.value)}}
                            />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input required type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" 
                                onChange={(e)=>{props.universalProps.handleInputChange('password_', e.target.value)}}
                            />
                            <label for="exampleInputPassword1">Re-enter Password</label>
                            <input required type="password" className="form-control" id="rePassword" placeholder="Password" 
                                onChange={(e)=>{props.universalProps.handleInputChange('password_', e.target.value)}}
                            />
                        </div>
                        <div className="">
                        <small id="emailHelp" className="form-text text-muted">We'll never share your information with anyone else.</small>
                            {/* <input type="checkbox" className="form-check-input" id="exampleCheck1" /> */}
                            {/* <label className="form-check-label" for="exampleCheck1">Check me out</label> */}
                            <hr />
                        </div>
                        <button type="submit" className="btn btn-primary">Sign Up{loading && 
                            <>
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only"></span>
                                </div>
                            </>
                        }</button>
                </form>
            </div>
    </>)

    return(
        <div>
        <br />
            <div style={{
                textAlign: 'left'
                }}>
                {haveAccount && loginForm}
                {!haveAccount && signUpFrom}
            </div>
            <br />
            <a href="#">
                <i onClick={()=>{setHaveAccount(!haveAccount)}}>
                    {!haveAccount ? 
                    "Already have an account? Click here to Log In" : 
                    "Don't have an account yet? Click here to sign up."}
                </i>
            </a>
            
        </div>
    )
}