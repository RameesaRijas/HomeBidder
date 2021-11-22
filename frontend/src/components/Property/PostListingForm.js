// call the axios
// go through interview form like Scheduler




import React from 'react';
import { Form, Row, Col, Button, Container } from 'react-bootstrap';

export default function PostListingForm() {

  return (

    <Container>
      <h2>New Property Listing</h2>

      <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridStreet">
          <Form.Label>Street Address</Form.Label>
          <Form.Control type="street" placeholder="Street Address" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>City</Form.Label>
          <Form.Control type="city" placeholder="City" />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridProvince">
          <Form.Label>Province</Form.Label>
          <Form.Select defaultValue="Please select...">
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
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPostal">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control type="post_code" placeholder="Postal Code" />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridPropertyType">
          <Form.Label>Property Type</Form.Label>
          <Form.Select defaultValue="Please select...">
            <option>Please select...</option>
            <option>Detached</option>
            <option>Semi-Detached</option>
            <option>Row/Townhouse</option>
            <option>Condominium Apartment</option>
            <option>Duplex</option>
            <option>Triplex</option>
            <option>Fourplex</option>
            <option>Mobile Home</option>
            <option>Floathome</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridBedrooms">
          <Form.Label>Bedrooms</Form.Label>
          <Form.Select defaultValue="Please select...">
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
          </Form.Select>
        </Form.Group>
      </Row>

      <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridBathrooms">
          <Form.Label>Bathrooms</Form.Label>
          <Form.Select defaultValue="Please select...">
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
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridParking">
          <Form.Label>Parking Spaces</Form.Label>
          <Form.Select defaultValue="Please select...">
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
          </Form.Select>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridFootage">
          <Form.Label>Square Footage</Form.Label>
          <Form.Control type="square_footage" placeholder="Square Footage" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridYearBuilt">
          <Form.Label>Year Built</Form.Label>
          <Form.Control type="year_built" placeholder="Year Built" />
        </Form.Group>
      </Row>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

    </Container>


  );
};

