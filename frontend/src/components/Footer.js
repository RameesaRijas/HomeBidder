import "./Footer.css";
import { Card, Button } from "react-bootstrap";

export default function Footer() {
  return (
    <>
      <div className="col-ms-16">
        <hr></hr>
      </div>
      <div className="footer">
        <div className="inside-footer">
          you can find as in
          <div className="contact-info">
            <i className="fa fa-twitter"></i>
          </div>
          <div className="contact-info">
            <i className="fa fa-facebook-square"></i>
          </div>
          <div className="contact-info">
            <i className="fa fa-envelope"></i>
          </div>
          <p> for more information </p>
          <div className="contact-info">
            <button className="btn btn-dark">Contact US</button>
          </div>
        </div>
      </div>
    </>
  );
}
