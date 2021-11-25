import PropertListItem from './PropertyListItem';
import './PropertyList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';
import Header from '../Header';
import { useContext } from 'react';
import { propertyContext } from '../../providers/PropertyProvider';



export default function PropertyList() {
  
  const {addToYourFav, removeFromFav, state} = useContext(propertyContext);
  
  const userFav = state.fav && state.fav.map(item => item.user_id === 2 ? item.property_id : 0);

  const propertylist = state.properties.map(item => 
                      <PropertListItem 
                        key={item.id} 
                        properties={item}
                        fav={userFav}
                        addToFav={addToYourFav}
                        removeFav={removeFromFav}
                      />)
  
  return (
    <>
    <Header />
    <Container>
      <h2><hr/></h2>
      <div className="property-list">
        <Row>
          {propertylist}
        </Row>
      </div>
    </Container>
    </>
  );

}