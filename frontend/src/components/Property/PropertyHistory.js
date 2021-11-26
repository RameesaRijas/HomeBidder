import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table,Card,Button } from "react-bootstrap";
import "./Property.css";
import "font-awesome/css/font-awesome.min.css";

export default function PropertyHistory() {
  
  const params = useParams();
  const [state, setState] = useState({
    properties: {},
    bidders: {},
    bids: {},
  });
  
  useEffect(() => {
    Promise.all([
      axios.get(`/api/properties/${params.propertyId}`),
      axios.get(`/api/properties/bidder`),
    ])
      .then(([{ data: properties }, { data: bidders }]) => {
        console.log("data", properties);
        setState({
          ...state,
          properties: properties,
          bidders: bidders,
        });
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
    <div><h4>Prpoerty history</h4></div>
      
              
    <div className="container-fluid">
      
    <Table>
      <thead>
       <tr>
       <th scope="col">#</th>
       <th scope="col">year</th>
       <th scope="col">Amount Sold</th>
       </tr>
      </thead>
      <tbody>
      <tr>
        <th scope="row">1</th>
        <td>2011</td>
        <td>2,380000</td>
      </tr>
      <tr>
        <th scope="row">1</th>
        <td>2013</td>
        <td>2,380080</td>
      </tr>
      </tbody>
    </Table>
    <div>
    <Card>
  <Card.Header as="h5">Featured</Card.Header>
  <Card.Body>
    <Card.Title></Card.Title>
    <Card.Text>
       you can find as in  
     <div > <i class="fa fa-twitter"></i></div>  
      <div><i class="fa fa-facebook-square"></i></div> 

      <div><i class="fa fa-envelope"></i></div>
    </Card.Text>
    <p> for more information  </p>
    <Button className="btn btn-dark">Contact US</Button>
  </Card.Body>
</Card>
    </div>
    
    </div>
  </>
  )
}