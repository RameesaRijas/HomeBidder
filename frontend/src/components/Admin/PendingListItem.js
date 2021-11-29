import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from "axios";
import { Container, Accordion, Row, Button, Col } from 'react-bootstrap';


export default function PendingListItem(props) {
  const { properties } = props;


  const approveListing = (e) => {
    const data = {
      // is_approved: true,
      property_id: properties.id,
      street: properties.street,
      user_id: properties.owner_id,
      first_name: properties.first_name
    }
    e.preventDefault()
    axios.patch('/api/properties/admin/pending/', {data})
    .then((response) => {
      window.location = "/admin/pending"
      console.log(response);
    })
    .catch((error) => console.log(error));
  };

  const formatter = new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });

  const dateFormater = (date) => {
    const d = new Date(date);
    return d.toLocaleString("en-US", { timeZone: "America/New_York" });
  };


  return (

    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <b>{properties.street}</b> &nbsp; &mdash; &nbsp; {properties.city}, {properties.province}, {properties.post_code}
        </Accordion.Header>
        <Accordion.Body>
        <Container>

          <Row>
            <Col>
              <i className="fa fa-user"></i> &nbsp;
              Seller: {properties.first_name} {properties.last_name}
            </Col>
            <Col>
              <i className="fa fa-credit-card"></i> &nbsp;
              Starting Price: {formatter.format(properties.base_price_in_cents / 100)}
            </Col>
          </Row>

          <Row>
            <Col>
              <i className="fa fa-home"></i> &nbsp;
              Property Type: {properties.property_type}
            </Col>
            <Col>
              <i className="fa fa-th-large"></i> &nbsp;
              Area: {properties.square_footage} SqFt
            </Col>
          </Row>

          <Row>
            <Col>
              <i className="fa fa-bed"></i> &nbsp;
              Number of Bedrooms: {properties.number_of_bedrooms}
            </Col>
            <Col>
              <i className="fa fa-shower"></i> &nbsp;
              Number of Bathrooms: {properties.number_of_bathrooms}
            </Col>
          </Row>

          <Row>
            <Col>
              <i className="fa fa-car"></i> &nbsp;
              Number of Parking Spaces: {properties.parking_spaces}
            </Col>
            <Col>
              <i className="fa fa-calendar"></i> &nbsp;
              Year Built: {properties.year_built}
            </Col>
          </Row>

          <Row>
            <Col>
              <i className="fa fa-history"></i> &nbsp;
              Bid Start Date: {dateFormater(properties.bid_start_date)}
            </Col>
            <Col>
              <i className="fa fa-history"></i> &nbsp;
              Bid End Date: {dateFormater(properties.bid_end_date)}
            </Col>
          </Row>

        </Container>

          <div className="p-2 mt-2">
            <Button variant="primary" type="button" onClick={approveListing}>
              Approve
            </Button>
          </div>

        </Accordion.Body>
      </Accordion.Item>
    </Accordion>

  )
}