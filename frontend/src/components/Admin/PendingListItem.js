import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { Container, Accordion, Row, Button } from 'react-bootstrap';


export default function PendingListItem(props) {
  const { properties } = props;


  // const approveListing = (e) => {
  //   const data = {is_approved: true, property_id:  properties.id}
  //   e.preventDefault()
  //   axios.patch('/api/properties/admin/pending/', {data})
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => console.log(error));
  // };


  return (

    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>{properties.street}</Accordion.Header>
        <Accordion.Body>
          <p>
            Seller:  {properties.first_name}
          </p>
          <p>
            <Button variant="primary" type="submit">
              Approve
            </Button>
          </p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>

  )
}