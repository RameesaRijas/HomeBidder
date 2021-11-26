import "./Login.css";
import React, {useState,useEffect, useContext} from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { propertyContext } from '../providers/PropertyProvider';


export default function Login(props) {

    const { setLoggedInUser } = useContext(propertyContext);

    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    //can be removed
    const [loginStatus, setLoginStatus] = useState(false);

    const login = (e) => {
        e.preventDefault();
        axios.post("/api/users/login", {
          email: userEmail,
          password: password,
        }).then((response) => {
             props.toggleLoginModal()
            console.log(response.data)
          if (!response.data.auth) {
            alert('Sorrrrrry !!!! Un-authenticated User !!!!!') 
            // setLoginStatus(false);
          } else {

              setLoggedInUser(response.data.user);

            //this item can be removed
              // localStorage.setItem("user",response.data.user)
              // localStorage.setItem("usertype",response.data.user.user_type)
              // localStorage.setItem("email",userEmail)
              // localStorage.setItem("token",response.data.token)
              // e.preventDefault();

              //this can be removed //page refresh happening  
              // window.location = "/";
              // setLoginStatus(true);

          }
        });
      };
      
///can be removed ?
    //   useEffect(() => {
    //     axios.get("api/users/login").then((response) => {
    //       if (response.data.loggedIn === true) {
    //         setLoginStatus(response.data.email);
    //       }
    //     });
    //   }, []);
    //  const userAuth = ()=>{
    //      axios.get("api/users/userAuth",{
    //         headers:{
    //       'x-access-token':localStorage.getItem("token")
    //      }}).then((response)=>{
    //         console.log(response)
    //      })
    //  }

   
  
   

  return(
    <div className="login">
      {!loginStatus && "please login to continue"} 
      
      <Modal show={props.show} onHide={props.toggleLoginModal} animation={false}>
        <Modal.Header closeButton>
        <Modal.Title>log in to continue</Modal.Title>
          </Modal.Header>
        <Modal.Body>
          <form className="loginform" onSubmit={login} >
            <div className="form-group ">
              <label >Email </label>
              <input type="email" 
                className="form-control" 
                id="email" 
                placeholder="Enter email"
                value={userEmail}
                onChange={(e) => {
                setUserEmail(e.target.value)}}
              />
            </div>
            <div className="form-group">
              <label >Password</label>
              <input type="password" 
                  className="form-control" 
                  id="password" 
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                      setPassword(e.target.value)}}
              />
            </div>
            <div className="form-group">
              <button
                type="submit" 
                className="login-button" >
                Submit
              </button>  
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
        <Button className="regiter-button" onClick={props.toggleLoginModal}>
              cancel
            </Button>
        </Modal.Footer>
      </Modal>
    </div>
);
}