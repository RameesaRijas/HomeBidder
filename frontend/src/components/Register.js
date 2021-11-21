import React, {useState} from 'react';
import './Register.css';
export default function RegistForm(props) {
  return(
        <div className="register">
            <form className="registerform">
                <div className="form-group ">
                <label >Email </label>
                <input type="email" 
                       className="form-control" 
                       id="email" 
                       placeholder="Enter email"
                />
                
                </div>
                <div className="form-group">
                    <label >First Name</label>
                    <input type="firstName" 
                        className="form-control" 
                        id="firstName" 
                        placeholder="First Name"
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="LastName" 
                        className="form-control" 
                        id="firstName" 
                        placeholder="Last Name"
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
                <div className="form-group ">
                    <label >Confirm Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="confirmPassword" 
                        placeholder="Confirm Password"
                    />
                </div>
                <div className="form-group">
                <button 
                    type="submit" 
                    className="regiter-button" >
                    Register
                </button>
                </div>
            </form>
        </div>
    )
  }