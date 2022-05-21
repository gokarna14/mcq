import React, { useState } from "react";
import Modal from "react-modal/lib/components/Modal";
import SideBySide from "../templates/SideBySide";
import { benefitsOfLogIn } from "../essentials/essentials";
import Emphasize from "../animations/Emphasize";
import axios from "axios";
import Swal from "sweetalert2";


export default function LoginSignUpButton(props){

    const [haveAccount, setHaveAccount] = useState(true)
    const [loading, setLoading] = useState(false)
    const [passwordMatch, setPasswordMatch] = useState(false)
    const [rePassword, setRePassword] = useState('')

    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }



    const handleLoginRequest=(e)=>{
        e.preventDefault();
        setLoading(true)
        // console.log((haveAccount ? "LogIn request" : "Sign Up request"));
        if (haveAccount){
            // axios.post('/api/UserLogIn', props.universalProps.userInf).then(
            //     res=>{
                    
            //     }
            // ).catch(err=>{
            //     console.log(err);
            // })
            axios.post('/api/presentOrNot', {...props.universalProps.userInf, what:'users'}).then(
                res=>{
                    if(res.data <= 0){
                        Swal.fire({
                            icon: 'error',
                            title: 'Invalid credentials',
                            text: 'No account exists with the given email and phone number',
                            footer: ''
                          })
                    }
                    else{
                        // Logged In
                        axios.post('/api/getUserInf', props.universalProps.userInf).then(
                            res=>{
                                console.log(res.data[0])
                                props.universalProps.setLoggedInUser(res.data[0])
                                props.universalProps.setUserLoggedIn(true)
                            }
                        ).catch(err=>{
                            console.log(err);
                        })
                        Swal.fire({
                            icon: 'success',
                            title: 'Log In successful !',
                            text: 'Welcome ' + props.universalProps.userInf.email,
                            footer: ''
                          })
                    }
                    setLoading(false)
                }
                ).catch(err=>{
                    console.log(err);
                })
        }
        else{
            axios.post('/api/presentOrNot', {...props.universalProps.userInf, what:'users'}).then(
                res=>{
                    if(res.data > 0){
                        Swal.fire({
                            icon: 'error',
                            title: 'Account already registered',
                            text: 'There already exists the account with the same email and phone number',
                            footer: ''
                          })
                    }
                    else{
                        axios.post('/api/UserSignUp', props.universalProps.userInf).then(
                            res=>{
                            }
                        ).catch(err=>{
                            console.log(err);
                        })
                        Swal.fire({
                            icon: 'success',
                            title: 'Done !',
                            text: 'Account registered, now you can log into your account',
                            footer: ''
                          })
                          setLoading(false)
                    }
                    setLoading(false)
                }
                ).catch(err=>{
                    console.log(err);
                })
            }
    }

    const loginForm = (<>
            <div className="">
                <form className=""
                        onSubmit={handleLoginRequest}
                    >
                    <h5>Please Login using valid credentials</h5>
                    <hr />
                        <div className="form-group">
                            <label for="userEmail">Email address</label>
                            <input type="email" className="form-control" id="userEmail" aria-describedby="emailHelp" placeholder="Enter email" 
                                onChange={(e)=>{props.universalProps.handleInputChange('email', e.target.value)}}
                                maxLength='50'
                                title="Max characters = 50"

                            />
                            <label for="userPhoneNumber">Phone Number</label>
                            <input required type="text" className="form-control" id="userPhoneNumber" aria-describedby="phoneNumber" placeholder="Phone Number" 
                                onChange={(e)=>{props.universalProps.handleInputChange('phone_number', e.target.value)}}
                                maxLength='12'
                                title="Max characters = 12"
                            />
                            
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input required type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" 
                                onChange={(e)=>{props.universalProps.handleInputChange('password_', e.target.value)}}
                                maxLength='50'
                                title="Max characters = 50"
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
             <div className="">
                <form className=""
                        onSubmit={handleLoginRequest}
                    >
                    <h5>Please Sign up providing valid Information</h5>
                    <hr />
                    
                        <div className="form-group">
                            <label for="userFname">First Name</label>
                                <input required type="text" className="form-control" id="userFname" aria-describedby="userFname" placeholder="First Name" 
                                onChange={(e)=>{props.universalProps.handleInputChange('fname', e.target.value)}}
                                maxLength='15'
                                title="Max characters = 15 | Only Alphabet is acceptable"
                                pattern="[A-Za-z]+"
                            />
                            <label for="userMname">Middle Name</label>
                                <input type="text" className="form-control" id="userMname" aria-describedby="userMname" placeholder="Middle Name" 
                                onChange={(e)=>{props.universalProps.handleInputChange('mname', e.target.value)}}
                                maxLength='15'
                                title="Max characters = 15 | Only Alphabet is acceptable"
                                pattern="[A-Za-z]+"

                            />
                            <label for="userLname">Last Name</label>
                                <input required type="text" className="form-control" id="userLname" aria-describedby="userLname" placeholder="Last Name" 
                                onChange={(e)=>{props.universalProps.handleInputChange('lname', e.target.value)}}
                                maxLength='15'
                                title="Max characters = 15 | Only Alphabet is acceptable"
                                pattern="[A-Za-z]+"
                            />

                            <label for="userDob">Date of birth</label>
                            <input required type="date" className="form-control" id="userDob" aria-describedby="dob" placeholder="Date of birth" 
                            onChange={(e)=>{props.universalProps.handleInputChange('dob', e.target.value)}}
                            />
                            <label for="userGender">Gender</label>
                            <select className="form-select"
                                onChange={(e)=>{props.universalProps.handleInputChange('gender', e.target.value)}}
                                required
                                title="Select your gender"
                            >
                                <option value='' selected>--Select--</option>
                                <option value="m">Male</option>
                                <option value="f">Female</option>
                                <option value="o">Others</option>
                            </select>
                            <label for="userEmail">Email address</label>
                            <input type="email" className="form-control" id="userEmail" aria-describedby="emailHelp" placeholder="Enter email" 
                                onChange={(e)=>{props.universalProps.handleInputChange('email', e.target.value)}}
                                maxLength='50'
                                title="Max characters = 50"
                            />
                            <label for="userPhoneNumber">Phone Number</label>
                            <input required type="number" className="form-control" id="userPhoneNumber" aria-describedby="phoneNumber" placeholder="Phone Number" 
                                onChange={(e)=>{props.universalProps.handleInputChange('phone_number', e.target.value)}}
                                maxLength='12'
                                title="Max characters = 12 | Only Numeric Values acceptable"
                                pattern="[0-9]"
                            />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input required type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" 
                                onChange={(e)=>{props.universalProps.handleInputChange('password_', e.target.value)
                                    // console.log("Re: " + rePassword)
                                    // console.log(e.target.value)
                                    setPasswordMatch(e.target.value === rePassword)
                                    }}
                                maxLength='50'
                                title="Max characters = 50"
                            />
                            <label for="exampleInputPassword1">Re-enter Password
                            <br />
                            <small>{ passwordMatch ? '✅ Match' : "❌ No match"}</small>
                            </label>
                            <input required type="password" className="form-control" id="rePassword" placeholder="Password" 
                                onChange={(e)=>{
                                    setRePassword(e.target.value)
                                    // console.log("pw: " + props.universalProps.userInf.password_)
                                    setPasswordMatch(e.target.value === props.universalProps.userInf.password_)
                                }}
                            />
                        </div>
                        <div className="">
        
                        <small id="emailHelp" className="form-text text-muted">We'll never share your information with anyone else.</small>
                            {/* <input type="checkbox" className="form-check-input" id="exampleCheck1" /> */}
                            {/* <label className="form-check-label" for="exampleCheck1">Check me out</label> */}
                            <hr />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={!passwordMatch}>Sign Up{loading && 
                            <>
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only"></span>
                                </div>
                            </>
                        }</button>
                </form>
            </div>
    </>)

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay:{
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0, .8)",
        zIndex: "1000",
        overflowY: "auto"
      }
  };

    const modal = <>
        <>
                <button onClick={openModal}
                    className='btn btn-outline-danger'
                >Login/Sign Up</button>
                <div
                className="modalStyle"
                >
                        <Modal
                            isOpen={modalIsOpen}
                            onAfterOpen={afterOpenModal}
                            onRequestClose={closeModal}
                            style={customStyles}
                        >
                        <SideBySide
                            left={
                                <>
                                    <br />
                                    {benefitsOfLogIn}
                                </>
                            }
                            right={
                                <div
                                    className=""
                                    >
                                    <br />
                                            <button 
                                                onClick={closeModal}            
                                                type="button"
                                                className="btn-close"
                                                title="Close"
                                            ></button>
                                        <hr />
                                            <div>
                                                {haveAccount && loginForm}
                                                {!haveAccount && signUpFrom}
                                            </div>
                                            <>
                                            {loading && <div className="spinner-border text-danger" role="status">
                                                <span className="sr-only"></span>
                                            </div>}
                                        </>
                                            <br />
                                            <div className="resLink">
                                                <i onClick={()=>{
                                                    setHaveAccount(!haveAccount)
                                                    props.universalProps.setUserInf({})
                                                }}>
                                                    {!haveAccount ? 
                                                    "Already have an account? Click here to Log In" : 
                                                    "Don't have an account yet? Click here to sign up."}
                                                </i>
                                            </div>
                                    </div>
                            }
                        ></SideBySide>
                    
                        </Modal>
                </div>
                
        </>
           
    </>

    return(
        <Emphasize
            content={
                <div>
                    {modal}
                </div>
            }
        ></Emphasize>

        
    )
}