import {Link} from 'react-router-dom';
import './PropertyListItem.css';


export default function PropertListItem(props) {
  const { properties, setPropertId } = props

  const imgUrl = properties.thumbnail && properties.thumbnail.map(item =>
                        <img style={{width:"50px"}}src={item.image_url} key={item.id}/>
                  );

  return (
    <>
      <div>
        <li>
          <Link
            to={{
              pathname:`/listing/${properties.id}`, 
              key: properties.id,
              state: properties}}>
              {properties.street}
          </Link>
          {imgUrl}
        </li>
      </div>
    </>
  );


}