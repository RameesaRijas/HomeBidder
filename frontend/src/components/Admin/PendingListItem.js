import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from "axios";
import { Container, Accordion, Row, Button } from 'react-bootstrap';


export default function PendingListItem(props) {
  const { properties } = props;


  const approveListing = (e) => {
    const data = {
      is_approved: true,
      property_id: properties.id,
      street: properties.street,
      user_id: properties.owner_id,
      first_name: properties.first_name
    }
    e.preventDefault()
    axios.patch('/api/properties/admin/pending/', {data})
    .then((response) => {
      console.log(response);
    })
    .catch((error) => console.log(error));
  };


  return (

    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          {properties.street} -- {properties.city}, {properties.province}, {properties.post_code}
        </Accordion.Header>
        <Accordion.Body>
          <p>
            Seller:  {properties.first_name} {properties.last_name}
          </p>
          <p>
            <Button variant="primary" type="button" onClick={approveListing}>
              Approve
            </Button>
          </p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>

  )
}