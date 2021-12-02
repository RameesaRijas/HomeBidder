import PropertListItem from "./PropertyListItem";
import "./PropertyList.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "react-bootstrap";
import { useContext } from "react";
import { propertyContext } from "../../providers/PropertyProvider";
import axios from "axios";
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";

export default function MyBids() {
  const [bids, setBids] = useState([]);

  const { state: contextState, addToYourFav, removeFromFav } = useContext(propertyContext);

  const user = contextState.loggedUser;
  const Userid = user && user.id;
  const userFav = contextState.fav && contextState.fav.map(item => item.user_id ===  Userid ? item.property_id : 0);

  useEffect(() => {
    axios
      .get("/api/properties/properties/myBids")
      .then((response) => {
        setBids([...response.data]);
      })
      .catch((error) => console.log(error));
  }, []);

  const bidList = bids.map((item, index) => (
    <PropertListItem key={index} properties={item} user={user} myList={false} 
    addToFav={addToYourFav}
    removeFav={removeFromFav}
    fav={userFav}/>
  ));

  return (
    <>
      <Container>
        <h2>My bids list </h2>
        <h2>
          <hr />
        </h2>

        <div className="property-list">
          <Row>
            {bidList.length === 0 && <Alert variant="dark">
    you don't have any bids for the moment 
  </Alert>}
            {bidList}
          </Row>
        </div>
      </Container>
    </>
  );
}
