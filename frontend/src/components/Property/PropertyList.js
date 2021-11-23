import PropertListItem from './PropertyListItem';
import './PropertyList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';
import Header from '../Header';


export default function PropertyList(props) {
  const { list } = props;
  const propertylist = list.properties.map(item => 
                      <PropertListItem 
                        key={item.id} 
                        properties={item}
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