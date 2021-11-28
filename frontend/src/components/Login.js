import "./Login.css";
import React, { useState, useContext } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { propertyContext } from "../providers/PropertyProvider";
import { toast } from "react-toastify";
import { Alart } from "react-bootstrap";

export default function Login(props) {
  const { setLoggedInUser } = useContext(propertyContext);

  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();
    axios
      .post("/api/users/login", {
        email: userEmail,
        password: password,
      })
      .then((response) => {
        props.toggleLoginModal();

        if (!response.data.auth) {
          if (password === "") {
            toast("please enter password");
            return;
          } else {
            toast("Sorrrrrry !!!! Un-authenticated User !!!!!");
          }
        } else {
          setLoggedInUser(response.data.user);
        }
      });
  };

  function validate() {
    if (userEmail === "") {
      toast("email cannot be blank");
      return;
    }
  }

  const userAuth = () => {
    axios
      .get("api/users/userAuth", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log("mays", response);
      });
  };

  return (
    <div className="login">
      <Modal
        show={props.show}
        onHide={props.toggleLoginModal}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>log in to continue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="loginform" onSubmit={login}>
            <div className="form-group ">
              <label>Email </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={userEmail}
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="button-login">
              <div className="form-group">
                <Button
                  className="login-button"
                  onClick={props.toggleLoginModal}
                >
                  cancel
                </Button>
              </div>
              <div className="form-group">
                <Button
                  type="submit"
                  className="login-button"
                  onClick={validate}
                >
                  Login
                </Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
