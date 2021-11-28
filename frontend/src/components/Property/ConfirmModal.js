import React from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { useState } from "react";
export default function Confirm() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="btn btn-dark" onClick={handleShow}>
        Register for the bid
      </Button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Term and Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <input
            type="checkbox"
            class="custom-control-input"
            id="defaultUnchecked"
          />{" "}
          <label class="custom-control-label" for="defaultUnchecked">
            by clicking sumbit you are agreed to our conditions
          </label>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
