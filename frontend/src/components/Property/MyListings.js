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

  const propertylist = state.properties.map(item => {
    if (Userid === item.owner_id) {
     return <PropertListItem
      key={item.id}
      properties={item}
      user={user}
    />
    }
  })


  return (
    <>
    <Container className="col-lg-10">
      <h5><hr/>My Property Listings</h5>
      <div className="property-list">
        <Row>
          {propertylist}
        </Row>
      </div>
    </Container>
    </>
  );

}