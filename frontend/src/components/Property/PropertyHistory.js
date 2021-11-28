import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Card, Button } from "react-bootstrap";
import "./Property.css";
import "font-awesome/css/font-awesome.min.css";
 import Footer from '../Footer';
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
      <div>
        <h4>Prpoerty history</h4>
      </div>

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
              <th scope="row">2</th>
              <td>2013</td>
              <td>2,380080</td>
            </tr>
          </tbody>
        </Table>
        <div >
         <Footer></Footer>
        </div>
      </div>
    </>
  );
}
