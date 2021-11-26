import { useContext } from 'react';
import { propertyContext } from '../../providers/PropertyProvider';
import PropertListItem from './PropertyListItem';
import './PropertyList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';

export default function MyListings() {
  const {state} = useContext(propertyContext);
  const user = state.loggedUser;
  const Userid = user && user.id;


  return (
    <>
    <Container className="col-lg-10">
      <h2><hr/>My Property Listings</h2>
      <div className="property-list">
        <Row>
          My Property
        </Row>
      </div>
    </Container>
    </>

  )
}