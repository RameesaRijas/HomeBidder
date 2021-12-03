import React from 'react'
import { Button } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import { useState } from 'react'
import { toast } from "react-toastify";


export default function Confirm(props) {
  const { bidId, register } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [agree, setAgree] = useState(false);

  const submit = () => {
    bidId &&
      register(bidId)
        .then(result => {
          setShow(false);
          toast.success(`You are registred for the bid - ${bidId}`)
        })
        .catch(err => console.log(err))
  }

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
          <form>
            By Submitting I agree that all my prsonal info are entered correct and i am aware of that the contract is valid and the authority can persue legal actions against me if any fraudulent occurs.
            <br />
            <input type="checkbox"
              className="custom-control-input"
              checked={agree}
              name='agree'
              onChange={(e) => setAgree(!agree)} />

            <label className="custom-control-label">
              I agree
            </label>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            cancel
          </Button>
          <Button variant="primary"  disabled={!agree} onClick={submit}>
            confirm
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
};