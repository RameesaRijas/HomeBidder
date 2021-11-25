import PropertListItem from './PropertyListItem';
import './PropertyList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';
import Header from '../Header';


export default function PropertyList(props) {
 
  const { list, addToYourFav, removeFromFav } = props;

  const userFav = list.fav && list.fav.map(item => item.user_id === 2 ? item.property_id : 0);

  const propertylist = list.properties.map(item => 
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