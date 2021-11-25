import React, { useState } from 'react';
import axios from 'axios';
import { Form, Row, Col, Button, Container, Modal } from 'react-bootstrap';

export default function PostListingForm() {
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postCode, setPostCode] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [numBeds, setNumBeds] = useState("");
  const [numBaths, setNumBaths] = useState("");
  const [numParking, setNumParking] = useState("");
  const [squareFootage, setSquareFootage] = useState("");
  const [yearBuilt, setYearBuilt] = useState("");
  const [bidStartDate, setBidStartDate] = useState("");
  const [bidEndDate, setBidEndDate] = useState("");
  const [basePrice, setBasePrice] = useState("");


  const userid = localStorage.getItem('userid');
  // console.log('userid from localStorage: ==> ', userid)

  const newListing = (e) => {
    e.preventDefault()
    axios.post('/api/properties/new', {
      street: street,
      city: city,
      province: province,
      post_code: postCode,
      property_type: propertyType,
      number_of_bedrooms: numBeds,
      number_of_bathrooms: numBaths,
      parking_spaces: numParking,
      square_footage: squareFootage,
      year_built: yearBuilt,
      owner_id: userid,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => console.log(error));
  };

  return (

  <Modal.Dialog size="lg">
    <Modal.Header>
      <Modal.Title className="m-auto">Create a New Listing</Modal.Title>
    </Modal.Header>

    <Modal.Body>

    <Container>
      <br></br>
      <Form onSubmit={newListing}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridStreet">
            <Form.Label>Street Address</Form.Label>
            <Form.Control
              type="street"
              placeholder="Street Address"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="city"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridProvince">
            <Form.Label>Province</Form.Label>
            <Form.Control as="select"
              type="province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              >
              <option>Please select...</option>
              <option>Alberta</option>
              <option>British Columbia</option>
              <option>Manitoba</option>
              <option>New Brunswick</option>
              <option>Newfoundland and Labrador</option>
              <option>Northwest Territories</option>
              <option>Nova Scotia</option>
              <option>Nunavut</option>
              <option>Ontario</option>
              <option>Prince Edward Island</option>
              <option>Quebec</option>
              <option>Saskatchewan</option>
              <option>Yukon</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPostal">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="postCode"
              placeholder="Postal Code"
              value={postCode}
              onChange={(e) => setPostCode(e.target.value)}
              />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridPropertyType">
            <Form.Label>Property Type</Form.Label>
            <Form.Control as="select"
              type="propertyType"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              >
              <option>Please select...</option>
              <option>Detached</option>
              <option>Semi-Detached</option>
              <option>Row/Townhouse</option>
              <option>Condo Apartment</option>
              <option>Duplex</option>
              <option>Triplex</option>
              <option>Fourplex</option>
              <option>Mobile Home</option>
              <option>Floathome</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridBedrooms">
            <Form.Label>Bedrooms</Form.Label>
            <Form.Control as="select"
              type="numBeds"
              value={numBeds}
              onChange={(e) => setNumBeds(e.target.value)}
              >
              <option>Please select...</option>
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
            </Form.Control>
          </Form.Group>
        </Row>

        <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridBathrooms">
            <Form.Label>Bathrooms</Form.Label>
            <Form.Control as="select"
              type="numBaths"
              value={numBaths}
              onChange={(e) => setNumBaths(e.target.value)}
              >
              <option>Please select...</option>
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridParking">
            <Form.Label>Parking Spaces</Form.Label>
            <Form.Control as="select"
              type="numParking"
              value={numParking}
              onChange={(e) => setNumParking(e.target.value)}
              >
              <option>Please select...</option>
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
            </Form.Control>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridFootage">
            <Form.Label>Square Footage</Form.Label>
            <Form.Control
              type="squareFootage"
              placeholder="Square Footage"
              value={squareFootage}
              onChange={(e) => setSquareFootage(e.target.value)}
              />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridYearBuilt">
            <Form.Label>Year Built</Form.Label>
            <Form.Control
              type="yearBuilt"
              placeholder="Year Built"
              value={yearBuilt}
              onChange={(e) => setYearBuilt(e.target.value)}
              />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridBidStart">
            <Form.Label>Bid Start Date</Form.Label>
            <Form.Control
              type="bidStartDate"
              placeholder="YYYY-MM-DD"
              value={squareFootage}
              onChange={(e) => setBidStartDate(e.target.value)}
              />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridBidEnd">
            <Form.Label>Bid End Date</Form.Label>
            <Form.Control
              type="bidEndDate"
              placeholder="YYYY-MM-DD"
              value={yearBuilt}
              onChange={(e) => setBidEndDate(e.target.value)}
              />
          </Form.Group>
        </Row>

        <Form.Group as={Col} controlId="formGridBidBasePrice" className="mb-3">
            <Form.Label>Bid Base Price</Form.Label>
            <Form.Control
              type="bidBasePrice"
              placeholder="$"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
              />
          </Form.Group>

        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Upload property images</Form.Label>
          <Form.Control type="file" multiple />
        </Form.Group>

        {/* <Form.Group as={Col} controlId="formGridOwnerId">
            <Form.Control
              type="hidden"
              value={localStorage.getItem('userid')}
              />
          </Form.Group> */}

        <Button className="me-4" variant="secondary">
          Cancel
        </Button>

        <Button variant="primary" type="submit">
          Submit Listing
        </Button>
      </Form>
      </Container>

    </Modal.Body>
  </Modal.Dialog>

  );
};

