
import "./Login.css";
import React, {useState,useEffect} from 'react';
import axios from 'axios';
export default function Login() {
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState(false);
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
              console.log(response.data)
              localStorage.setItem("email",userEmail)
              localStorage.setItem("token",response.data.token)
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

     const logout =()=> {
         setLoginStatus(false)
         localStorage.setItem("token","")
     }
      
  return(
    <div className="login">
        {!loginStatus && "please login to continue"}
    <form className="loginform" onSubmit={login} >
        <div className="form-group ">
        <label >Email </label>
        <input type="email" 
               className="form-control" 
               id="email" 
               placeholder="Enter email"
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
    {/* <button onClick={userAuth}>check auth </button> */}
</div>
)
}