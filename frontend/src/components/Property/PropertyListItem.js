import {Link} from 'react-router-dom';
import './PropertyListItem.css';
import 'font-awesome/css/font-awesome.min.css';
import { Carousel, Col } from 'react-bootstrap';


export default function PropertListItem(props) {
  const { properties } = props

  const imgUrl = properties.thumbnail && properties.thumbnail.map(item =>
                        <Carousel.Item>
                          <img
                            className="d-block w-100"
                            src={item.image_url}
                            alt="First slide"
                            />
                        </Carousel.Item>
                  );
    const formatter = new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    
  return (
    <Col sm>
      <div className="box">
        <div className="top">
          <Link
              to={{
                pathname:`/listing/${properties.id}`, 
                key: properties.id}}>
            <Carousel interval={null}>
              {imgUrl}
            </Carousel>
          </Link>
          <span className="fav">
            <i className="fa fa-heart"></i>
          </span>
        </div>
        <div className="bottom">
          <h3>{properties.street}</h3>
          <p>
            Enchanting {properties.number_of_bedrooms} bedrooms,  {properties.number_of_bathrooms} bath home 
          </p>
          <div className="advants">
            <div>
              <span>Bedrooms</span>
              <div>
                <i className="fa fa-th-large"></i>
                <span>{properties.number_of_bedrooms}</span>
              </div>
            </div>
            <div>
              <span>Bathrooms</span>
              <div>
                <i className="fa fa-shower"></i>
                <span>{properties.number_of_bathrooms}</span></div>
              </div>
            <div>
              <span>Area</span>
              <div>
                <i className="fa fa-square"></i>
                <span>{properties.square_footage}<span>Sq Ft</span></span>
              </div>
            </div>
          </div>
          <div className="price">
            <span>For Sale</span>
            <span>{formatter.format(properties.base_price_in_cents / 100)}</span>
          </div>
        </div>
      </div>
      </Col>
  );


}