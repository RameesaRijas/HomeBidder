
import "./Login.css";
import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {Button} from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
export default function Login() {
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState(false);
    // const [type,setType]= useState("");
    const login = (e) => {
        e.preventDefault()
        axios.post("api/users/login", {
          email: userEmail,
          password: password,
        }).then((response) => {
            console.log(response.data)
          if (!response.data.auth) {
            setLoginStatus(false);
          } else {

              localStorage.setItem("user",response.data.user)
              localStorage.setItem("userid",response.data.user.id)
              localStorage.setItem("usertype",response.data.user.user_type)
              localStorage.setItem("email",userEmail)
              localStorage.setItem("token",response.data.token)
               window.location.reload(false);
             setLoginStatus(true);

          }
        });
      };

      useEffect(() => {
        axios.get("api/users/").then((response) => {
          if (response.data.loggedIn === true) {
            setLoginStatus(response.data.email);
          }
        });
      }, []);
     const userAuth = ()=>{
         axios.get("api/users/userAuth",{
            headers:{
          'x-access-token':localStorage.getItem("token")
         }}).then((response)=>{
            console.log(response)
         })
     }

    //  const logout =()=> {
    //      setLoginStatus(false)

    //      localStorage.setItem("token","")

    //  }
     const history = useHistory();

      const handleClick = () => history.push("/login");

      const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return(
    <div className="login">

         {!loginStatus && "please login to continue"}
         <Button variant="primary" onClick={handleShow}>
              login
           </Button>
           <Modal show={show} onHide={handleClose} animation={false}>
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
            <Button className="regiter-button" onClick={handleClose}>
              cancel
            </Button>


          </Modal.Footer>
    </Modal>

    {/* <button onClick={userAuth}>check auth </button> */}
</div>
)
}