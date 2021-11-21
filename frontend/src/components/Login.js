import React from 'react';
import "./Login.css";

export default function Login() {
  return(
    <div className="login">
    <form className="loginform">
        <div className="form-group ">
        <label >Email </label>
        <input type="email" 
               className="form-control" 
               id="email" 
               placeholder="Enter email"
        />
        </div>
        <div className="form-group">
            <label >Password</label>
            <input type="password" 
                className="form-control" 
                id="password" 
                placeholder="Password"
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
</div>
)
}